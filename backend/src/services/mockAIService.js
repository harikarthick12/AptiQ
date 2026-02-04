// Mock AI Service - Generates realistic educational content without API calls
// Localized for Indian context (Rupees, Indian names, and exams)
// Supports Regional Languages (Tamil, Telugu) for explanations

class MockAIService {
    constructor() {
        this.contentDatabase = {
            'Percentages': {
                Beginner: {
                    explanation: "Percentages are a way to express a number as a fraction of 100. In India, we use percentages for everything from your 10th Board marks to Diwali discounts. 'Percent' literally means 'per hundred'. So, 75% in an exam means you got 75 marks out of every 100.",
                    explanation_tamil: "விழுக்காடு (Percentage) என்பது 100-ன் ஒரு பகுதியாக எண்ணை வெளிப்படுத்தும் முறையாகும். இந்தியாவில், 10-ஆம் வகுப்பு மதிப்பெண்கள் முதல் தீபாவளி தள்ளுபடிகள் வரை அனைத்திற்கும் சதவீதத்தைப் பயன்படுத்துகிறோம். 'சதவீதம்' என்றால் 'நூற்றுக்கு' என்று பொருள்.",
                    explanation_telugu: "శాతం (Percentage) అనేది 100లో ఒక వంతుగా సంఖ్యను వ్యక్తీకరించే మార్గం. మన దేశంలో, 10వ తరగతి మార్కుల నుండి డిస్కౌంట్ల వరకు ప్రతిదానికీ శాతాన్ని ఉపయోగిస్తాము. 'శాతం' అంటే 'ప్రతి వందకు' అని అర్థం.",
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
                            explanation_tamil: "1200-ல் 10% என்பது 120. 5% என்பது 60. எனவே 15% என்பது 120 + 60 = 180 ஆகும்.",
                            explanation_telugu: "1200లో 10% అంటే 120. 5% అంటే 60. కాబట్టి 15% అంటే 120 + 60 = 180.",
                            difficulty: "Beginner"
                        }
                    ],
                    tip: "To quickly find 10%, just drop the last zero or move the decimal one place left!"
                }
            },
            'Time & Work': {
                Beginner: {
                    explanation: "Time and Work problems are common in Indian competitive exams. The fundamental rule is: If Priya can finish a task in 5 days, her 'Work Rate' is 1/5 of the task per day.",
                    explanation_tamil: "நேரம் மற்றும் வேலை கணக்குகள் இந்திய போட்டித் தேர்வுகளில் முக்கியமானவை. அடிப்படை விதி: பிரியா ஒரு வேலையை 5 நாட்களில் முடிக்கிறார் என்றால், அவரின் ஒரு நாள் வேலை அந்த வேலையின் 5-ல் 1 பங்கு (1/5) ஆகும்.",
                    explanation_telugu: "కాలం మరియు పని సమస్యలు పోటీ పరీక్షల్లో చాలా ముఖ్యం. ప్రాథమిక నియమం: ప్రియ ఒక పనిని 5 రోజుల్లో పూర్తి చేయగలిగితే, ఆమె ఒక రోజులో చేసే పని ఆ పనిలో 1/5 వంతు.",
                    workedExample: {
                        problem: "Arjun can paint a wall in 6 hours, and Bikram can paint the same wall in 12 hours. How long will they take if they work together?",
                        solution: "Arjun's rate: 1/6 per hour.\nBikram's rate: 1/12 per hour.\nCombined rate: 1/6 + 1/12 = 3/12 = 1/4 per hour.\nTotal time: 4 hours.",
                    },
                    questions: [
                        {
                            questionText: "Rahul can finish a project in 10 days, while Sneha takes 15 days. If they work together, how long will they take?",
                            options: ["5 days", "6 days", "8 days", "9 days"],
                            correctAnswer: "6 days",
                            explanation: "1/10 + 1/15 = 5/30 = 1/6. So 6 days.",
                            explanation_tamil: "1/10 + 1/15 = 5/30 = 1/6. எனவே 6 நாட்கள் ஆகும்.",
                            explanation_telugu: "1/10 + 1/15 = 5/30 = 1/6. అంటే 6 రోజులు పడుతుంది.",
                            difficulty: "Beginner"
                        }
                    ],
                    tip: "Always convert time into work rate (1/Time) for calculations!"
                }
            },
            'Probability': {
                Beginner: {
                    explanation: "Probability measures the likelihood of an event happening. It ranges from 0 (impossible) to 1 (certain).",
                    explanation_tamil: "நிகழ்தகவு (Probability) என்பது ஒரு நிகழ்வு நடக்க எவ்வளவு வாய்ப்பு உள்ளது என்பதை அளவிடுவதாகும்.",
                    explanation_telugu: "సంభావ్యత (Probability) అనేది ఒక సంఘటన జరిగే అవకాశాన్ని కొలుస్తుంది.",
                    workedExample: {
                        problem: "When tossing a fair fair coin, what is the probability of getting Heads?",
                        solution: "Total outcomes = 2 (Head, Tail). Favorable outcome = 1 (Head). Probability = 1/2 = 0.5 or 50%.",
                    },
                    questions: [
                        {
                            questionText: "What is the probability of rolling a '4' on a standard 6-sided die?",
                            options: ["1/2", "1/4", "1/6", "1/3"],
                            correctAnswer: "1/6",
                            explanation: "Only one face is '4' out of 6 possible faces. So 1/6.",
                            explanation_tamil: "மொத்தம் 6 பக்கங்கள் உள்ளன. அதில் '4' ஒரு பக்கம் மட்டுமே உள்ளது. எனவே 1/6.",
                            explanation_telugu: "మొత్తం 6 వైపులు ఉంటాయి. అందులో '4' ఒకసారి మాత్రమే వస్తుంది. కాబట్టి 1/6.",
                            difficulty: "Beginner"
                        }
                    ],
                    tip: "Probability = Favored Outcomes / Total Possible Outcomes"
                }
            },
            'OOPS': {
                Beginner: {
                    explanation: "Object-Oriented Programming (OOPS) is like a blueprint for building things. Classes are blueprints, and Objects are the real things built from them.",
                    explanation_tamil: "OOPS என்பது மென்பொருள் உருவாக்க ஒரு சிறந்த வழிமுறை. கிளாஸ் (Class) என்பது ஒரு வரைபடம் போன்றது, ஆப்ஜெக்ட் (Object) என்பது அந்த வரைபடத்தை வைத்து உருவாக்கப்பட்ட ஒரு பொருள்.",
                    explanation_telugu: "OOPS అనేది వస్తువుల ఆధారిత ప్రోగ్రామింగ్. క్లాస్ అనేది ఒక నమూనా, మరియు ఆబ్జెక్ట్ ఆ నమూనా నుండి తయారైన ఒక వస్తువు.",
                    workedExample: {
                        problem: "If we have a class 'Vehicle', identify some objects.",
                        solution: "Objects of 'Vehicle' class can be: Car, Bike, Truck, Bus.",
                    },
                    questions: [
                        {
                            questionText: "Which OOPS concept focuses on hiding internal data from the outside world?",
                            options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
                            correctAnswer: "Encapsulation",
                            explanation: "Encapsulation wraps data and code together into a single unit and hides implementation details.",
                            explanation_tamil: "Encapsulation என்பது தரவுகளை வெளி உலகிற்கு தெரியாமல் பாதுகாப்பாக வைக்கும் முறையாகும்.",
                            explanation_telugu: "Encapsulation అనేది డేటాను బయటి ప్రపంచం నుండి దాచి ఉంచే పద్ధతి.",
                            difficulty: "Beginner"
                        }
                    ],
                    tip: "Remember the 4 pillars: Encapsulation, Abstraction, Inheritance, Polymorphism!"
                }
            },
            'Arrays': {
                Beginner: {
                    explanation: "An Array is a collection of items stored at contiguous memory locations. It's like a row of lockers in a school!",
                    explanation_tamil: "அரே (Array) என்பது தொடர்ச்சியான நினைவக இடங்களில் சேமிக்கப்படும் தரவுகளின் தொகுப்பாகும்.",
                    explanation_telugu: "అరే (Array) అనేది ఒకే రకమైన డేటాను వరుసగా నిల్వ చేసే పద్ధతి.",
                    workedExample: {
                        problem: "In an array [10, 20, 30, 40], what is the element at index 2?",
                        solution: "Indices start at 0. Index 0: 10, Index 1: 20, Index 2: 30. Answer is 30.",
                    },
                    questions: [
                        {
                            questionText: "What is the index of the FIRST element in an array in most programming languages?",
                            options: ["-1", "0", "1", "2"],
                            correctAnswer: "0",
                            explanation: "Arrays are zero-indexed, meaning the first element is always at index 0.",
                            difficulty: "Beginner"
                        }
                    ],
                    tip: "Indices always start at 0, not 1!"
                }
            },
            'Data Structures': {
                Beginner: {
                    explanation: "Data Structures are specialized ways of organizing and storing data so that they can be used efficiently.",
                    explanation_tamil: "டேட்டா ஸ்ட்ரக்சர்ஸ் (Data Structures) என்பது தகவல்களை திறமையாக நிர்வகிக்க பயன்படும் முறைகளாகும்.",
                    explanation_telugu: "డేటా స్ట్రక్చర్స్ అనేది సమాచారాన్ని సమర్థవంతంగా అమర్చడానికి ఉపయోగించే పద్ధతులు.",
                    workedExample: {
                        problem: "A Stack follows which principle?",
                        solution: "Stack follows LIFO (Last In First Out). Think of a pile of plates.",
                    },
                    questions: [
                        {
                            questionText: "Which data structure follows the FIFO (First In First Out) principle?",
                            options: ["Stack", "Queue", "Tree", "Graph"],
                            correctAnswer: "Queue",
                            explanation: "In a Queue, the first one to enter is the first one to leave, like a line at a bus stop.",
                            difficulty: "Beginner"
                        }
                    ],
                    tip: "Think of real-world examples: Stack = Plates, Queue = Ticket line!"
                }
            }
        };
    }

    async generateSessionContent(topic, level, previousContext = null, preferredLanguage = 'English') {
        // Fallback logic to ensure we always return SOMETHING valid even for missing topics
        const normalizedTopic = this.contentDatabase[topic] ? topic : 'Percentages';
        const topicData = this.contentDatabase[normalizedTopic];
        const content = topicData[level] || topicData['Beginner'];

        let finalExplanation = content.explanation;

        // Regional Language Logic for initial explanation
        if (preferredLanguage === 'Tamil' && content.explanation_tamil) {
            finalExplanation = content.explanation_tamil;
        } else if (preferredLanguage === 'Telugu' && content.explanation_telugu) {
            finalExplanation = content.explanation_telugu;
        }

        // If the user previously failed, provide a "Supportive" recap in regional language
        if (previousContext && previousContext.userAnswer) {
            let recapPrefix = "Analyzing your performance: Let's fix those mistakes: ";
            if (preferredLanguage === 'Tamil') recapPrefix = "கவலைப்படாதீர்கள், உங்கள் தவறுகளை சரி செய்வோம்: ";
            if (preferredLanguage === 'Telugu') recapPrefix = "చింతించకండి, మీ పొరపాట్లను సరిచేద్దాం: ";
            finalExplanation = `${recapPrefix}${finalExplanation}`;
        }

        return {
            explanation: finalExplanation,
            workedExample: content.workedExample,
            questions: content.questions.map(q => ({
                ...q,
                // Ensure logic for feedback card: frontend uses 'explanation' field
                // We overwrite explanation if regional is needed
                explanation: (preferredLanguage === 'Tamil' && q.explanation_tamil) ? q.explanation_tamil :
                    (preferredLanguage === 'Telugu' && q.explanation_telugu) ? q.explanation_telugu :
                        q.explanation
            })),
            tip: content.tip
        };
    }
}

module.exports = new MockAIService();
