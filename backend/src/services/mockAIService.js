// Mock AI Service - Generates realistic educational content without API calls
// Localized for Indian context (Rupees, Indian names, and exams)

class MockAIService {
    constructor() {
        this.contentDatabase = {
            'Percentages': {
                Beginner: {
                    explanation: "Percentages are a way to express a number as a fraction of 100. In India, we use percentages for everything from your 10th Board marks to Diwali discounts. 'Percent' literally means 'per hundred'. So, 75% in an exam means you got 75 marks out of every 100.",
                    workedExample: {
                        problem: "If a smartphone originally costs ₹15,000 and has a 'Great Indian Sale' discount of 20%, what is the final price?",
                        solution: "Step 1: Find 20% of ₹15,000\n(20/100) × 15,000 = ₹3,000\n\nStep 2: Subtract discount from original price\n₹15,000 - ₹3,000 = ₹12,000\n\nAnswer: The sale price is ₹12,000"
                    },
                    questions: [
                        {
                            questionText: "What is 15% of ₹1,200?",
                            options: ["₹150", "₹180", "₹200", "₹220"],
                            correctAnswer: "₹180",
                            explanation: "10% of 1200 is 120. 5% is 60. So 15% is 120 + 60 = 180.",
                            difficulty: "Beginner"
                        },
                        {
                            questionText: "If Rahul scored 480 out of 600 in his Class 12 exams, what is his percentage?",
                            options: ["75%", "80%", "85%", "90%"],
                            correctAnswer: "80%",
                            explanation: "Percentage = (Obtained Marks / Total Marks) × 100 = (480/600) × 100 = 80%.",
                            difficulty: "Beginner"
                        },
                        {
                            questionText: "A laptop price increased from ₹40,000 to ₹44,000. What is the percentage increase?",
                            options: ["5%", "8%", "10%", "12%"],
                            correctAnswer: "10%",
                            explanation: "Increase = ₹4,000. % Increase = (4000 / 40000) × 100 = 10%.",
                            difficulty: "Beginner"
                        }
                    ],
                    tip: "To quickly find 10%, just drop the last zero or move the decimal one place left!"
                },
                Intermediate: {
                    explanation: "Intermediate percentages involve 'Successive Changes' (like a discount on top of a discount) and 'Reverse Percentages'. Remember: a 10% increase followed by a 10% decrease does NOT return to the original value because the base changes.",
                    workedExample: {
                        problem: "The price of petrol in Mumbai increased by 10% and then decreased by 10% the next week. What is the net change from the original price?",
                        solution: "Let original price be ₹100.\nAfter 10% increase: ₹110.\nNow find 10% of ₹110: ₹11.\nAfter 10% decrease: ₹110 - ₹11 = ₹99.\nNet change: 1% decrease from original ₹100.",
                        difficulty: "Intermediate"
                    },
                    questions: [
                        {
                            questionText: "If the price of sugar increases by 25%, by what percentage must a household reduce its consumption so its sugar budget stays the same?",
                            options: ["20%", "25%", "15%", "33%"],
                            correctAnswer: "20%",
                            explanation: "Formula: [r / (100 + r)] × 100 = [25 / 125] × 100 = 20%.",
                            difficulty: "Intermediate"
                        },
                        {
                            questionText: "A shopkeeper gives two successive discounts of 20% and 10% on a saree worth ₹5,000. What is the final price?",
                            options: ["₹3,500", "₹3,600", "₹3,750", "₹4,000"],
                            correctAnswer: "₹3,600",
                            explanation: "First discount: 20% of 5000 = 1000. New price = 4000. Second discount: 10% of 4000 = 400. Final = ₹3,600.",
                            difficulty: "Intermediate"
                        }
                    ],
                    tip: "Use the formula (x + y + xy/100) for successive percentage changes!"
                }
            },
            'Time & Work': {
                Beginner: {
                    explanation: "Time and Work problems are common in Indian competitive exams like SSC and IBPS. The fundamental rule is: If Priya can finish a task in 5 days, her 'Work Rate' is 1/5 of the task per day.",
                    workedExample: {
                        problem: "Arjun can paint a wall in 6 hours, and Bikram can paint the same wall in 12 hours. How long will they take if they work together?",
                        solution: "Arjun's rate: 1/6 per hour.\nBikram's rate: 1/12 per hour.\nCombined rate: 1/6 + 1/12 = 3/12 = 1/4 per hour.\nTotal time: 4 hours.",
                        difficulty: "Beginner"
                    },
                    questions: [
                        {
                            questionText: "Rahul can finish a project in 10 days, while Sneha takes 15 days. If they work together, how long will they take?",
                            options: ["5 days", "6 days", "8 days", "9 days"],
                            correctAnswer: "6 days",
                            explanation: "1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6. So 6 days.",
                            difficulty: "Beginner"
                        },
                        {
                            questionText: "10 workers can build a wall in Mumbai in 12 days. How many days will 15 workers take for the same wall?",
                            options: ["6 days", "8 days", "9 days", "10 days"],
                            correctAnswer: "8 days",
                            explanation: "Inverse proportion: 10 * 12 = 15 * X. X = 120/15 = 8.",
                            difficulty: "Beginner"
                        }
                    ],
                    tip: "More people = Less time. Always think in terms of one day's work!"
                }
            },
            'OOPS': {
                Beginner: {
                    explanation: "Object-Oriented Programming (OOPS) is like a Maruti Suzuki service center. Every 'Car' is an object. The 'Blueprints' used to build cars are 'Classes'. They have Attributes (Model, Color) and Methods (Accelerate, Brake).",
                    workedExample: {
                        problem: "Design an 'Accounts' class for an Indian bank.",
                        solution: "class Account:\n  def __init__(self, name, balance):\n    self.account_holder = name\n    self.balance = balance\n\n  def deposit(self, amount):\n    self.balance += amount\n    print(f'₹{amount} deposited in {self.account_holder} account.')",
                        difficulty: "Beginner"
                    },
                    questions: [
                        {
                            questionText: "Which concept allows a 'SavingsAccount' to inherit features from a general 'BankAccount'?",
                            options: ["Abstraction", "Inheritance", "Polymorphism", "Encapsulation"],
                            correctAnswer: "Inheritance",
                            explanation: "Inheritance allows a child class to take properties from a parent class.",
                            difficulty: "Beginner"
                        }
                    ],
                    tip: "Think of OOPS as modeling real-world Indian objects!"
                }
            }
        };
    }

    async generateSessionContent(topic, level, previousContext = null) {
        // Simulate slight delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const topicData = this.contentDatabase[topic] || this.contentDatabase['Percentages'];
        const content = topicData[level] || topicData['Beginner'];

        let finalExplanation = content.explanation;
        if (previousContext && previousContext.userAnswer) {
            finalExplanation = `Analyzing your previous performance: You correctly identified the logic but missed the final calculation. Let's recap: ${content.explanation}`;
        }

        return {
            explanation: finalExplanation,
            workedExample: content.workedExample,
            questions: content.questions,
            tip: content.tip
        };
    }
}

module.exports = new MockAIService();
