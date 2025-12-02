// Simple rule-based AI logic for posture analysis
// In production, this would be replaced with a real ML model

interface PostureData {
  date: string
  score: number
  badTime: number
  alerts: number
}

interface AdviceItem {
  title: string
  description: string
}

interface PersonalizedAdvice {
  riskLevel: string
  exercises: AdviceItem[]
  tips: AdviceItem[]
}

export function getPersonalizedAdvice(postureData: PostureData[]): PersonalizedAdvice {
  // Calculate average bad posture time (last 7 days)
  const avgBadTime = postureData.reduce((sum, d) => sum + d.badTime, 0) / postureData.length

  // Calculate average score
  const avgScore = postureData.reduce((sum, d) => sum + d.score, 0) / postureData.length

  // Determine risk level
  let riskLevel = "Low"
  if (avgBadTime > 60 || avgScore < 60) {
    riskLevel = "High"
  } else if (avgBadTime > 40 || avgScore < 75) {
    riskLevel = "Medium"
  }

  // Recommend exercises based on risk
  let exercises: AdviceItem[] = []
  if (riskLevel === "High") {
    exercises = [
      { title: "Cat-Cow Stretch", description: "Mobilize spine, 2x daily" },
      { title: "Lower Back Stretch", description: "Relief lower tension, 3x daily" },
      { title: "Plank Hold", description: "Strengthen core, 2x daily" },
    ]
  } else if (riskLevel === "Medium") {
    exercises = [
      { title: "Shoulder Roll", description: "Release tension, 1x daily" },
      { title: "Neck Stretches", description: "Relieve stiffness, 2x daily" },
      { title: "Lower Back Stretch", description: "Preventive care, 1x daily" },
    ]
  } else {
    exercises = [
      { title: "Shoulder Roll", description: "Maintain good posture, 3x weekly" },
      { title: "General stretching", description: "Keep flexibility, 2x weekly" },
      { title: "Walking breaks", description: "Prevent stiffness, hourly" },
    ]
  }

  // Recommend medical tips based on risk
  let tips: AdviceItem[] = []
  if (riskLevel === "High") {
    tips = [
      { title: "Activate heat therapy", description: "Use belt for 20 mins to relieve pain" },
      { title: "Consider massage", description: "Use belt massage feature for relaxation" },
      { title: "Consult specialist", description: "Consider seeing a physiotherapist" },
    ]
  } else if (riskLevel === "Medium") {
    tips = [
      { title: "Take regular breaks", description: "Stand up every 30 minutes" },
      { title: "Use ergonomic setup", description: "Adjust monitor and chair height" },
      { title: "Heat therapy when needed", description: "Use belt for comfort" },
    ]
  } else {
    tips = [
      { title: "Maintain good habits", description: "Keep your current routine" },
      { title: "Stay active", description: "Exercise regularly for prevention" },
      { title: "Monitor progress", description: "Check your daily scores" },
    ]
  }

  return { riskLevel, exercises, tips }
}
