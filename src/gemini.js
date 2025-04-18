import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBx60VnSHQ4tlcp9OkUWonC2xzFMs0RGAo" });

export async function evaluateCodeWithGemini(code_submission) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Evaluate the following code submission based on its quality, functionality, and adherence to best practices. Provide a detailed review including strengths, areas for improvement, and an overall summary. The response must be in the following JSON format:

      {
        "Summary": "A concise overall assessment of the code.",
        "Strengths": "Key strengths of the code.",
        "Areas_for_Improvement": "Key areas where the code can be improved.",
        "Code_Recommendations": "Specific recommendations for improving the code."
      }

      CODE SUBMISSION:
      ${code_submission}

      IMPORTANT NOTES:
      - Ensure the response is valid JSON.
      - Do not include any text outside the JSON object.
      - If the code submission is invalid or incomplete, provide a JSON response with a Summary explaining the issue.
      - Focus on providing actionable feedback and insights.`,
    });

    // Strip any code block formatting (e.g., ```json ... ```)
    const rawText = response.text.replace(/^```[a-zA-Z]*\n|```$/g, "");

    // Attempt to parse the cleaned response as JSON
    try {
      return JSON.parse(rawText);
    } catch (jsonError) {
      console.error("Failed to parse JSON response:", rawText);
      return { Summary: "The response from Gemini was not in the expected format. Please try again." };
    }
  } catch (error) {
    console.error("Error evaluating code with Gemini:", error);
    throw error;
  }
}
