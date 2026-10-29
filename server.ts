import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "healthy", service: "physiomatch-api" });
});

// Generate pre-visit clinical intake briefing using Gemini 3.8 Flash
app.post("/api/intake-summary", async (req, res) => {
  try {
    const {
      patientName,
      ageGroup,
      anatomicalZone,
      subRegion,
      painLevel,
      painType,
      duration,
      isPostOp,
      postOpDetails,
      radiatingNumbness,
      dailyImpact,
      aggravatingFactors,
      relievingFactors,
      previousTreatments,
      targetGoals,
      practitionerName,
      practitionerSpecialty,
    } = req.body;

    if (!anatomicalZone) {
      return res.status(400).json({ error: "Anatomical zone is required" });
    }

    const prompt = `You are an expert clinical physiotherapy intake coordinator. Prepare a concise, structured, evidence-informed Pre-Visit Clinical Briefing (SOAP Subjective format) for a registered physiotherapist.

PATIENT & CONDITION DATA:
- Patient Name: ${patientName || "Confidential Patient"}
- Age Group: ${ageGroup || "Adult"}
- Primary Anatomical Focus: ${anatomicalZone} (${subRegion || "General region"})
- Pain Severity (VAS): ${painLevel || "Not rated"}/10
- Sensation / Pain Quality: ${Array.isArray(painType) ? painType.join(", ") : painType || "Aching / Constant"}
- Chronicity / Duration: ${duration || "Recent"}
- Post-Operative Status: ${isPostOp ? `Yes - ${postOpDetails || "Recent orthopedic surgery"}` : "No"}
- Neurological Red/Yellow Flag Screening (Radiating / Numbness / Tingling): ${radiatingNumbness ? "Yes (Peripheral paresthesia or radiating sensation noted)" : "None reported"}
- Functional / Daily Impact: ${dailyImpact || "Mobility limitation in daily activities"}
- Aggravating Factors: ${aggravatingFactors || "Weight bearing / prolonged postures"}
- Relieving Factors: ${relievingFactors || "Rest / ice / position change"}
- Previous Treatments Attempted: ${Array.isArray(previousTreatments) ? previousTreatments.join(", ") : previousTreatments || "None / OTC medication"}
- Patient Rehabilitation Goals: ${targetGoals || "Return to pain-free daily function and active movement"}
- Target Specialist: ${practitionerName || "Attending Physiotherapist"} (${practitionerSpecialty || "Musculoskeletal Specialist"})

Provide the clinical briefing with the following sections formatted in clean markdown:
1. **Clinical Snapshot & Chief Complaint**: High-yield 2-sentence summary of anatomical presentation, duration, and severity.
2. **Subjective Clinical History**: Detailed breakdown of onset, symptoms, aggravating/relieving factors, and functional limitations.
3. **Screening & Flag Considerations**: Notes on acuity, radiating neurological symptoms, or red/yellow flags warranting specific diagnostic tests (e.g. neurodynamic tension tests, directional preference, ligamentous stability).
4. **Relevant Evidence-Informed Focus Areas**: Key assessment areas (e.g., active range of motion, joint mobilization, neurodynamic testing, strength/endurance deficits) and potential evidence-aligned modalities matching this condition.
5. **Patient-Reported Functional Goals**: Concrete recovery milestones for the initial care plan.

Keep the tone objective, clinical, professional, and directly actionable for the treating physiotherapist.`;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback structured briefing if API key is not configured in environment
      return res.json({
        summary: `### Clinical Snapshot & Chief Complaint
Patient presents with primary discomfort localized to the **${anatomicalZone}** (${subRegion || "Localized"}), reporting a pain intensity of **${painLevel || 6}/10** with symptom quality characterized as **${Array.isArray(painType) ? painType.join(", ") : painType || "aching and stiffness"}**. Condition duration is **${duration || "subacute"}**.

### Subjective Clinical History
- **Onset & Chronicity**: ${duration || "Subacute presentation"} without high-velocity trauma reported.
- **Symptom Nature**: Primary pain centered at ${anatomicalZone}. ${radiatingNumbness ? "Patient notes peripheral radiating sensation / intermittent paresthesia requiring dermatomal and reflex screening." : "No radicular distribution reported."}
- **Aggravating Factors**: Aggravated by ${aggravatingFactors || "prolonged static posture and end-range loading"}.
- **Relieving Factors**: Improved with ${relievingFactors || "gentle mobility, rest, and thermal relief"}.
- **Daily Living Impact**: ${dailyImpact || "Restricted functional tolerance and altered biomechanics noted"}.

### Screening & Flag Considerations
- Acuity: ${painLevel > 7 ? "High pain sensitivity — initial session should prioritize gentle symptom modulation and directional preference." : "Moderate severity — suitable for active functional assessment."}
- Neurological: ${radiatingNumbness ? "Peripheral symptoms present: perform upper/lower limb neurodynamic tests (ULNT / Slump) and myotomal testing." : "No overt neurological flags identified on initial intake."}
- Surgical History: ${isPostOp ? `Post-operative rehabilitation protocol required (${postOpDetails || "Orthopedic review"}). Verify surgeon weight-bearing limits.` : "Non-surgical presentation."}

### Relevant Evidence-Informed Focus Areas
- Diagnostic objective testing: Active/passive range of motion, segmental passive accessory intervertebral movement (PAIVMs), and targeted provocative tests.
- Recommended initial modalities: Targeted manual therapy, active directional exercise, progressive load management, and home exercise program (HEP) prescription.

### Patient-Reported Functional Goals
- ${targetGoals || "Restore full functional range of motion and return to recreational activities without compensatory guarding."}`,
        isAIGenerated: false,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    const text = response.text || "";
    res.json({
      summary: text,
      isAIGenerated: true,
    });
  } catch (error: any) {
    console.error("Gemini pre-visit intake error:", error);
    res.status(500).json({
      error: "Unable to generate pre-visit clinical summary at this time.",
      details: error?.message || "Internal server error",
    });
  }
});

// Transcribe microphone audio using gemini-3.5-transcribe
app.post("/api/transcribe-audio", async (req, res) => {
  try {
    const { audioData, mimeType } = req.body;

    if (!audioData) {
      return res.status(400).json({ error: "Audio data is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        text: "I have persistent lower back pain that shoots down my right leg when sitting at my desk. It gets worse after 30 minutes, but gentle walking helps relieve the stiffness.",
        isFallback: true,
      });
    }

    const audioPart = {
      inlineData: {
        mimeType: mimeType || "audio/webm",
        data: audioData,
      },
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-transcribe",
      contents: {
        parts: [
          audioPart,
          { text: "Accurately transcribe the spoken patient clinical symptom description. Output only the clean transcribed text with no extra commentary." },
        ],
      },
    });

    res.json({
      text: response.text || "",
      isAIGenerated: true,
    });
  } catch (error: any) {
    console.error("Gemini audio transcription error:", error);
    res.status(500).json({
      error: "Audio transcription failed",
      details: error?.message || "Internal error",
    });
  }
});

// Configure Vite middleware in development or static serving in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`PhysioMatch AI server listening on port ${PORT}`);
  });
}

startServer();
