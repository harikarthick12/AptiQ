
// Large Static Question Bank for AptiQ
// This replaces the need for AI and ensures high-quality, non-repetitive content.

const questionBank = {
    // APTITUDE SECTION - UPDATED
    'Number System': {
        explanation: "The Number System is the foundation of mathematics. It includes types of numbers (Natural, Whole, Prime, etc.), Divisibility rules, Remainder theorem, Unit digits, Factors, and Progressions (AP & GP).",
        explanation_tamil: "எண் முறை என்பது கணிதத்தின் அடிப்படை. இதில் எண்களின் வகைகள், வகுபடும் விதிகள், மீதி தேற்றம், காரணிகள் மற்றும் கூட்டு மற்றும் பெருக்குத் தொடர்கள் ஆகியவை அடங்கும்.",
        explanation_telugu: "సంఖ్యా వ్యవస్థ గణితానికి పునాది. ఇందులో సంఖ్యల రకాలు, విభజన నియమాలు, శేష సిద్ధాంతం, కారకాలు మరియు శ్రేణులు (AP & GP) ఉంటాయి.",
        workedExample: {
            problem: "Find the unit digit of 2^53.",
            solution: "Powers of 2 repeat every 4 steps: 2, 4, 8, 6. \nDivide exponent 53 by 4: 53 = 13*4 + 1. \nRemainder is 1, so unit digit is 2^1 = 2."
        },
        questions: [
            { id: 'ns1', questionText: "Which of the following is a prime number?", options: ["91", "87", "97", "81"], correctAnswer: "97", explanation: "97 has no factors other than 1 and itself. 91=7*13, 87=3*29, 81=9*9.", difficulty: "Beginner" },
            { id: 'ns2', questionText: "What is the sum of first 50 natural numbers?", options: ["1225", "1275", "1250", "1300"], correctAnswer: "1275", explanation: "Sum = n(n+1)/2 = 50*51/2 = 25*51 = 1275.", difficulty: "Beginner" },
            { id: 'ns3', questionText: "A number is divisible by 11 if the difference between the sum of digits at odd and even places is?", options: ["0 or multiple of 11", "Always 0", "Always 11", "Multiple of 3"], correctAnswer: "0 or multiple of 11", explanation: "This is the divisibility rule for 11.", difficulty: "Beginner" },
            { id: 'ns4', questionText: "Find the number of trailing zeros in 100!.", options: ["20", "24", "25", "30"], correctAnswer: "24", explanation: "Zeros = [100/5] + [100/25] = 20 + 4 = 24.", difficulty: "Intermediate" },
            { id: 'ns5', questionText: "What is the remainder when 17^19 is divided by 18?", options: ["1", "17", "16", "2"], correctAnswer: "17", explanation: "Using (a-1)^n / a, if n is odd, remainder is a-1. 17 is (18-1), exponent 19 is odd, so remainder is 17.", difficulty: "Intermediate" },
            { id: 'ns6', questionText: "How many factors does 360 have?", options: ["20", "24", "18", "30"], correctAnswer: "24", explanation: "360 = 2^3 * 3^2 * 5^1. Factors = (3+1)(2+1)(1+1) = 4*3*2 = 24.", difficulty: "Intermediate" },
            { id: 'ns7', questionText: "Find the unit digit of (234)^100.", options: ["4", "6", "2", "8"], correctAnswer: "6", explanation: "For base ending in 4: if power is even, unit digit is 6; if odd, it's 4. 100 is even, so 6.", difficulty: "Beginner" },
            { id: 'ns8', questionText: "Find the unit digit of 7^105.", options: ["1", "3", "7", "9"], correctAnswer: "7", explanation: "7^1=7, 7^2=9, 7^3=3, 7^4=1. 105 mod 4 = 1. So 7^1 = 7.", difficulty: "Beginner" },
            { id: 'ns9', questionText: "Find the 10th term of an AP: 2, 5, 8, ...", options: ["27", "29", "31", "33"], correctAnswer: "29", explanation: "a=2, d=3. T10 = a + 9d = 2 + 9(3) = 29.", difficulty: "Beginner" },
            { id: 'ns10', questionText: "What is the sum of squares of first 10 natural numbers?", options: ["385", "400", "350", "425"], correctAnswer: "385", explanation: "Sum = n(n+1)(2n+1)/6 = 10*11*21/6 = 385.", difficulty: "Intermediate" },
            { id: 'ns11', questionText: "The number 456*7 is divisible by 3. What is the digit *?", options: ["1", "2", "3", "0"], correctAnswer: "2", explanation: "Sum of digits 4+5+6+7+x = 22+x. For divisibility by 3, 22+x must be 24, so x=2.", difficulty: "Beginner" },
            { id: 'ns12', questionText: "Successive division of a number by 4 and 5 leaves remainders 1 and 4. What is the number?", options: ["19", "37", "53", "21"], correctAnswer: "37", explanation: "Number = 4(5k + 4) + 1. For k=1, N=4(9)+1=37.", difficulty: "Advanced" },
            { id: 'ns13', questionText: "Find the last two digits of 25^50.", options: ["25", "50", "75", "00"], correctAnswer: "25", explanation: "Any power of a number ending in 25 (except 25^0) ends in 25.", difficulty: "Intermediate" },
            { id: 'ns14', questionText: "Which is greater? 2^300 or 3^200", options: ["2^300", "3^200", "Both equal", "Cannot determine"], correctAnswer: "3^200", explanation: "(2^3)^100 = 8^100. (3^2)^100 = 9^100. 9^100 > 8^100.", difficulty: "Intermediate" },
            { id: 'ns15', questionText: "A number when divided by 899 leaves remainder 63. What is the remainder when divided by 29?", options: ["5", "3", "2", "1"], correctAnswer: "5", explanation: "Remainder = 63 mod 29 = 5.", difficulty: "Intermediate" }
        ]
    },
    'HCF and LCM': {
        explanation: "HCF (Highest Common Factor) is the largest number dividing all given numbers. LCM (Least Common Multiple) is the smallest number divisible by all. Relationship: HCF × LCM = Product of Numbers.",
        explanation_tamil: "மீ.பொ.வ (HCF) என்பது கொடுக்கப்பட்ட அனைத்து எண்களையும் வகுக்கும் மிகப்பெரிய எண். மீ.சி.ம (LCM) என்பது அனைத்து எண்களாலும் வகுபடும் மிகச்சிறிய எண்.",
        explanation_telugu: "HCF అనేది ఇచ్చిన అన్ని సంఖ్యలను భాగించే అతిపెద్ద సంఖ్య. LCM అనేది అన్ని సంఖ్యలచే భాగించబడే అతి చిన్న సంఖ్య.",
        workedExample: {
            problem: "Find HCF and LCM of 12 and 18.",
            solution: "Factors of 12: 2^2 * 3. Factors of 18: 2 * 3^2. \nHCF = 2 * 3 = 6. \nLCM = 2^2 * 3^2 = 4 * 9 = 36."
        },
        questions: [
            { id: 'hl1', questionText: "Find HCF of 24, 36, 40.", options: ["4", "8", "12", "6"], correctAnswer: "4", explanation: "24=2^3*3, 36=2^2*3^2, 40=2^3*5. Common is 2^2=4.", difficulty: "Beginner" },
            { id: 'hl2', questionText: "Find LCM of 12, 15, 20.", options: ["40", "60", "80", "120"], correctAnswer: "60", explanation: "12=2^2*3, 15=3*5, 20=2^2*5. LCM = 2^2*3*5 = 60.", difficulty: "Beginner" },
            { id: 'hl3', questionText: "HCF of two numbers is 11 and their LCM is 693. If one number is 77, find the other.", options: ["88", "99", "101", "121"], correctAnswer: "99", explanation: "Number = (HCF * LCM) / 77 = (11 * 693) / 77 = 693 / 7 = 99.", difficulty: "Beginner" },
            { id: 'hl4', questionText: "Find the HCF of 2/3, 8/9, 16/81.", options: ["2/81", "16/3", "2/3", "8/81"], correctAnswer: "2/81", explanation: "HCF of fractions = HCF(numerators) / LCM(denominators) = HCF(2,8,16) / LCM(3,9,81) = 2/81.", difficulty: "Intermediate" },
            { id: 'hl5', questionText: "LCM of 0.6, 9.6, 0.12 is?", options: ["9.6", "0.96", "96", "1.2"], correctAnswer: "9.6", explanation: "Convert to 60/100, 960/100, 12/100. LCM = LCM(60, 960, 12)/100 = 960/100 = 9.6.", difficulty: "Intermediate" },
            { id: 'hl6', questionText: "Three bells ring at intervals of 12, 15, 18 min. If they ring together at 9 AM, when next?", options: ["11 AM", "12 PM", "10 AM", "10:30 AM"], correctAnswer: "12 PM", explanation: "LCM(12,15,18) = 180 min = 3 hours. 9 AM + 3 hours = 12 PM.", difficulty: "Intermediate" },
            { id: 'hl7', questionText: "The ratio of two numbers is 3:4 and their HCF is 4. Find their LCM.", options: ["12", "16", "24", "48"], correctAnswer: "48", explanation: "Numbers are 3*4=12 and 4*4=16. LCM(12,16) = 48.", difficulty: "Intermediate" },
            { id: 'hl8', questionText: "Find the greatest number that will divide 43, 91 and 183 so as to leave the same remainder in each case.", options: ["4", "7", "9", "13"], correctAnswer: "4", explanation: "HCF(91-43, 183-91, 183-43) = HCF(48, 92, 140) = 4.", difficulty: "Advanced" },
            { id: 'hl9', questionText: "Find the least number which when divided by 6, 7, 8, 9 and 12 leaves the same remainder 1 in each case.", options: ["504", "505", "253", "169"], correctAnswer: "505", explanation: "LCM(6,7,8,9,12) + 1 = 504 + 1 = 505.", difficulty: "Intermediate" },
            { id: 'hl10', questionText: "HCF of two co-prime numbers is?", options: ["0", "1", "Product of numbers", "Sum of numbers"], correctAnswer: "1", explanation: "By definition, co-prime numbers have no common factor other than 1.", difficulty: "Beginner" },
            { id: 'hl11', questionText: "The product of two numbers is 2025 and their HCF is 15. Find their LCM.", options: ["135", "150", "125", "145"], correctAnswer: "135", explanation: "LCM = Product / HCF = 2025 / 15 = 135.", difficulty: "Beginner" },
            { id: 'hl12', questionText: "LCM of two numbers is 48. The numbers are in ratio 2:3. Sum of numbers is?", options: ["20", "40", "30", "10"], correctAnswer: "40", explanation: "Let numbers be 2x, 3x. LCM = 6x = 48 => x=8. Sum = 5x = 40.", difficulty: "Intermediate" },
            { id: 'hl13', questionText: "Find HCF of 0.54, 1.8, 7.2.", options: ["0.18", "1.8", "0.018", "18"], correctAnswer: "0.18", explanation: "Make them 54, 180, 720. HCF(54, 180, 720) = 18. Divide by 100 = 0.18.", difficulty: "Intermediate" },
            { id: 'hl14', questionText: "Least number of square tiles required to pave a room 15m 17cm long and 9m 2cm broad?", options: ["814", "802", "841", "780"], correctAnswer: "814", explanation: "HCF(1517, 902) = 41. Tiles = (1517*902)/(41*41) = 37*22 = 814.", difficulty: "Advanced" },
            { id: 'hl15', questionText: "Which of the following is true?", options: ["HCF is always <= LCM", "HCF divides LCM", "LCM divides HCF", "HCF * LCM = Sum of numbers"], correctAnswer: "HCF divides LCM", explanation: "HCF is a factor of both numbers, and LCM is a multiple of both, hence HCF must divide LCM.", difficulty: "Beginner" }
        ]
    },
    'Simplifications': {
        explanation: "Simplification involves reducing mathematical expressions using the VBODMAS rule, managing fractions, decimals, surds, and indices. It also covers square and cube roots.",
        explanation_tamil: "சுருக்குதல் என்பது VBODMAS விதி, பின்னங்கள், தசமங்கள் மற்றும் அடுக்கு குறிகளைப் பயன்படுத்தி கணிதக் கோவைகளை எளிமையாக்குவதாகும்.",
        explanation_telugu: "సరళీకరణ అనేది VBODMAS నియమం, భిన్నాలు, దశాంశాలు మరియు ఘాతాంకాలను ఉపయోగించి గణిత వ్యక్తీకరణలను తగ్గించడం.",
        workedExample: {
            problem: "Simplify: 20 + 15 ÷ 3 × 2 - 8",
            solution: "Follow VBODMAS:\n1. Division: 15 ÷ 3 = 5\n2. Multiplication: 5 × 2 = 10\n3. Addition: 20 + 10 = 30\n4. Subtraction: 30 - 8 = 22.\nFinal Answer: 22."
        },
        questions: [
            { id: 'sm1', questionText: "Simplify: 18 - [5 - {6 + (2 - 4)}]", options: ["13", "15", "17", "19"], correctAnswer: "17", explanation: "18 - [5 - {6 - 2}] = 18 - [5 - 4] = 18 - 1 = 17.", difficulty: "Beginner" },
            { id: 'sm2', questionText: "Convert 0.363636... into a fraction.", options: ["36/99", "4/11", "36/100", "9/25"], correctAnswer: "4/11", explanation: "x = 0.3636. 100x = 36.3636. 99x = 36. x = 36/99 = 4/11.", difficulty: "Beginner" },
            { id: 'sm3', questionText: "Find the value of: 1 + 1 / (1 + 1/5)", options: ["11/6", "6/5", "5/6", "11/5"], correctAnswer: "11/6", explanation: "1 + 1/(6/5) = 1 + 5/6 = 11/6.", difficulty: "Beginner" },
            { id: 'sm4', questionText: "Simplify: (a³ - b³) / (a² + ab + b²)", options: ["a - b", "a + b", "a² - b²", "1"], correctAnswer: "a - b", explanation: "Identity: a³ - b³ = (a - b)(a² + ab + b²). Dividing gives (a - b).", difficulty: "Intermediate" },
            { id: 'sm5', questionText: "Simplify: (256)^0.16 * (256)^0.09", options: ["4", "16", "64", "256.25"], correctAnswer: "4", explanation: "256^(0.16+0.09) = 256^0.25 = 256^(1/4) = 4.", difficulty: "Intermediate" },
            { id: 'sm6', questionText: "Value of √[√0.0001] is?", options: ["0.1", "0.01", "1", "0.001"], correctAnswer: "0.1", explanation: "√0.0001 = 0.01. √0.01 = 0.1.", difficulty: "Beginner" },
            { id: 'sm7', questionText: "Rationalization of 1 / (√3 - √2) gives?", options: ["√3 + √2", "√3 - √2", "1", "5"], correctAnswer: "√3 + √2", explanation: "Multiply numerator and denominator by (√3 + √2). Denominator becomes 3-2=1.", difficulty: "Intermediate" },
            { id: 'sm8', questionText: "Which is largest: √2, ∛3, ∜4?", options: ["√2", "∛3", "∜4", "All equal"], correctAnswer: "∛3", explanation: "Convert to power of 1/12: 2^6/12=64^1/12, 3^4/12=81^1/12, 4^3/12=64^1/12. 81 is largest.", difficulty: "Intermediate" },
            { id: 'sm9', questionText: "Square root of 7 + 4√3 is?", options: ["2 + √3", "2 - √3", "√3 - 1", "√7 + √4"], correctAnswer: "2 + √3", explanation: "(2 + √3)² = 4 + 3 + 4√3 = 7 + 4√3.", difficulty: "Advanced" },
            { id: 'sm10', questionText: "Cube root of 4096 is?", options: ["14", "16", "18", "12"], correctAnswer: "16", explanation: "16 * 16 * 16 = 4096.", difficulty: "Beginner" }
        ]
    },
    'Profit and Loss': {
        explanation: "Profit and Loss is used to determine the financial gain or loss in business transactions. Key terms include Cost Price (CP), Selling Price (SP), Marked Price (MP), Discount, and Profit/Loss %. Advanced concepts include successive discounts and alligation.",
        explanation_tamil: "இலாப நஷ்டம் என்பது வணிகப் பரிவர்த்தனைகளில் நிதி ஆதாயம் அல்லது இழப்பைத் தீர்மானிக்கப் பயன்படுகிறது. அடக்க விலை (CP), விற்பனை விலை (SP), குறித்த விலை (MP), தள்ளுபடி மற்றும் இலாப/நஷ்ட சதவீதம் ஆகியவை இதன் முக்கிய சொற்கள்.",
        explanation_telugu: "లాభం మరియు నష్టం వ్యాపార లావాదేవీలలో ఆర్థిక లాభం లేదా నష్టాన్ని నిర్ణయించడానికి ఉపయోగించబడుతుంది. కొనుగోలు ధర (CP), అమ్మకపు ధర (SP), ప్రకటిత ధర (MP), తగ్గింపు మరియు లాభం/నష్టం % ఇందులో ముఖ్యమైన పదాలు.",
        workedExample: {
            problem: "If a person sells an item for $120 after purchasing it for $100, find the profit percentage.",
            solution: "SP = 120, CP = 100.\nProfit = SP - CP = 120 - 100 = 20.\nProfit % = (Profit / CP) * 100 = (20 / 100) * 100 = 20%."
        },
        questions: [
            { id: 'pl1', questionText: "A man buys an article for Rs. 300 and sells it for Rs. 360. Find his profit %.", options: ["10%", "20%", "25%", "15%"], correctAnswer: "20%", explanation: "Profit = 360 - 300 = 60. % = (60/300)*100 = 20%.", difficulty: "Beginner" },
            { id: 'pl2', questionText: "If the cost price is 80% of the selling price, what is the profit percentage?", options: ["20%", "25%", "15%", "30%"], correctAnswer: "25%", explanation: "Let SP = 100, then CP = 80. Profit = 20. % = (20/80)*100 = 25%.", difficulty: "Intermediate" },
            { id: 'pl3', questionText: "A man sold two items for Rs. 990 each. On one he gained 10% and on other he lost 10%. Overall gain or loss?", options: ["No gain no loss", "1% gain", "1% loss", "2% loss"], correctAnswer: "1% loss", explanation: "When SP is same and % gain = % loss, there is always a loss of (x/10)^2 = (10/10)^2 = 1%.", difficulty: "Intermediate" },
            { id: 'pl4', questionText: "A shopkeeper gives two successive discounts of 20% and 10%. Find the single equivalent discount.", options: ["30%", "28%", "25%", "22%"], correctAnswer: "28%", explanation: "Net discount = 20 + 10 - (20*10)/100 = 28%.", difficulty: "Intermediate" },
            { id: 'pl5', questionText: "If the ratio of CP and SP is 4:5, find the profit %.", options: ["20%", "25%", "15%", "10%"], correctAnswer: "25%", explanation: "Let CP=4, SP=5. Profit=1. % = (1/4)*100 = 25%.", difficulty: "Beginner" },
            { id: 'pl6', questionText: "A person buys pens at 10 for Rs. 8 and sells them at 8 for Rs. 10. Find his profit %.", options: ["56.25%", "25%", "50%", "36%"], correctAnswer: "56.25%", explanation: "CP of 1 pen = 8/10 = 0.8. SP of 1 pen = 10/8 = 1.25. Profit = 0.45. % = (0.45/0.8)*100 = 56.25%.", difficulty: "Advanced" },
            { id: 'pl7', questionText: "What is the marked price of an item if it is sold for Rs. 441 after a 2% discount?", options: ["Rs. 450", "Rs. 460", "Rs. 445", "Rs. 455"], correctAnswer: "Rs. 450", explanation: "0.98 * MP = 441 => MP = 441 / 0.98 = 450.", difficulty: "Intermediate" },
            { id: 'pl8', questionText: "A dishonest dealer professes to sell his goods at CP but uses a weight of 900g for 1kg. Find his gain %.", options: ["10%", "11.11%", "9.09%", "12.5%"], correctAnswer: "11.11%", explanation: "Gain % = [Error / (True Value - Error)] * 100 = [100 / (1000 - 100)] * 100 = 11.11%.", difficulty: "Advanced" },
            { id: 'pl9', questionText: "A tradesman marks his goods 20% above CP and allows a discount of 10%. His gain % is?", options: ["10%", "8%", "12%", "6%"], correctAnswer: "8%", explanation: "Let CP=100. MP=120. SP = 120 * 0.9 = 108. Gain = 8%.", difficulty: "Intermediate" },
            { id: 'pl10', questionText: "If SP of 10 articles is equal to CP of 12 articles, find the profit %.", options: ["20%", "25%", "15%", "10%"], correctAnswer: "20%", explanation: "10*SP = 12*CP => SP/CP = 12/10 = 6/5. Profit = 1/5 = 20%.", difficulty: "Intermediate" }
        ]
    },
    'Average': {
        explanation: "Average (Mean) is the sum of observations divided by the number of observations. It covers Simple Average, Weighted Average, properties of averages of consecutive numbers, and impacts of missing or repetitive terms.",
        explanation_tamil: "சராசரி என்பது மொத்த மதிப்புகளின் கூட்டுத்தொகையை மதிப்புகளின் எண்ணிக்கையால் வகுப்பதாகும். இது எளிய சராசரி, கூட்டு சராசரி மற்றும் தொடர்ச்சியான எண்களின் சராசரி பண்புகளை உள்ளடக்கியது.",
        explanation_telugu: "సగటు అంటే రాశుల మొత్తంను రాశుల సంఖ్యచే భాగించడం. ఇందులో సాధారణ సగటు, వెయిటెడ్ సగటు మరియు వరుస సంఖ్యల సగటు లక్షణాలు ఉంటాయి.",
        workedExample: {
            problem: "Find the average of first 5 odd numbers.",
            solution: "First 5 odd numbers: 1, 3, 5, 7, 9.\nSum = 1+3+5+7+9 = 25.\nAverage = 25 / 5 = 5.\nShortcut: Average of first 'n' odd numbers is always 'n'."
        },
        questions: [
            { id: 'av1', questionText: "Find the average of first 10 natural numbers.", options: ["5", "5.5", "6", "4.5"], correctAnswer: "5.5", explanation: "Sum = n(n+1)/2 = 55. Avg = 55/10 = 5.5.", difficulty: "Beginner" },
            { id: 'av2', questionText: "The average of 5 consecutive numbers is 20. Find the largest number.", options: ["20", "22", "24", "26"], correctAnswer: "22", explanation: "Let numbers be x-2, x-1, x, x+1, x+2. Avg = x = 20. Largest = 20+2 = 22.", difficulty: "Intermediate" },
            { id: 'av3', questionText: "The average weight of 8 persons increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. Weight of new person is?", options: ["70 kg", "80 kg", "85 kg", "90 kg"], correctAnswer: "85 kg", explanation: "Weight of new = 65 + (8 * 2.5) = 65 + 20 = 85 kg.", difficulty: "Intermediate" },
            { id: 'av4', questionText: "Average of 10 matches is 32 runs. How many runs should be scored in next match to increase average by 4?", options: ["76", "70", "40", "84"], correctAnswer: "76", explanation: "Total runs needed for 11 matches = 11 * 36 = 396. Current total = 10 * 32 = 320. Next match = 76.", difficulty: "Intermediate" },
            { id: 'av5', questionText: "Find the average of squares of first 5 natural numbers.", options: ["11", "15", "13", "12"], correctAnswer: "11", explanation: "Sum = (5*6*11)/6 = 55. Avg = 55/5 = 11.", difficulty: "Intermediate" },
            { id: 'av6', questionText: "A batsman in his 17th inning makes a score of 85, and thereby increases his average by 3. What is his average after 17th inning?", options: ["34", "37", "31", "40"], correctAnswer: "37", explanation: "Let old avg be x. 16x + 85 = 17(x+3) => x=34. New avg = 37.", difficulty: "Advanced" },
            { id: 'av7', questionText: "Average of 50 numbers is 38. If two numbers 45 and 55 are discarded, find the average of remaining numbers.", options: ["37.5", "37", "38", "36"], correctAnswer: "37.5", explanation: "Total = 50*38 = 1900. New total = 1900 - 100 = 1800. New avg = 1800 / 48 = 37.5.", difficulty: "Intermediate" },
            { id: 'av8', questionText: "Out of 9 persons, 8 spend Rs 30 each for their meals. The 9th spends Rs 20 more than the average of all. Find total money spent.", options: ["Rs 260", "Rs 290", "Rs 292.5", "Rs 300"], correctAnswer: "Rs 292.5", explanation: "Let avg be x. 9th spends (x+20). 8*30 + (x+20) = 9x => 260 = 8x => x=32.5. Total = 9 * 32.5 = 292.5.", difficulty: "Advanced" },
            { id: 'av9', questionText: "The average marks obtained by 120 candidates was 35. If average of passed was 39 and failed was 15, find number of candidates who passed.", options: ["100", "110", "120", "80"], correctAnswer: "100", explanation: "Using alligation: (39-35):(35-15) = 4:20 = 1:5. Wait, Ratio is (35-15):(39-35) = 20:4 = 5:1. Passed = (5/6)*120 = 100.", difficulty: "Advanced" },
            { id: 'av10', questionText: "The average of first five multiples of 3 is?", options: ["3", "9", "12", "15"], correctAnswer: "9", explanation: "3, 6, 9, 12, 15. Avg is middle term = 9.", difficulty: "Beginner" }
        ]
    },
    'Ratio and Proportion': {
        explanation: "Ratio and Proportion involves comparing quantities and finding relationships between them. Concepts include Compound, Duplicate, and Triplicate ratios; Mean, Third, and Fourth proportions; and applications in Partnership (Working/Sleeping partners), Age problems, Coin problems, and Income-Expenditure analysis.",
        explanation_tamil: "விகிதம் மற்றும் விகிதாச்சாரம் என்பது அளவுகளை ஒப்பிட்டு அவற்றுக்கிடையேயான தொடர்புகளைக் கண்டறிவதாகும். இதில் கூட்டு விகிதம், இருபடி விகிதம், வயது கணக்குகள், நாணயக் கணக்குகள் மற்றும் கூட்டாண்மை ஆகியவை அடங்கும்.",
        explanation_telugu: "నిష్పత్తి మరియు అనుపాతం పరిమాణాలను పోల్చడం మరియు వాటి మధ్య సంబంధాలను కనుగొనడం. ఇందులో సమ్మేళన నిష్పత్తి, వయస్సు సమస్యలు, నాణేల సమస్యలు మరియు భాగస్వామ్య వ్యాపార లెక్కలు ఉంటాయి.",
        workedExample: {
            problem: "If A:B = 2:3 and B:C = 4:5, find A:B:C.",
            solution: "To combine, make B same in both. \nA:B = 2*4 : 3*4 = 8:12. \nB:C = 4*3 : 5*3 = 12:15. \nSo, A:B:C = 8:12:15."
        },
        questions: [
            { id: 'rp1', questionText: "Find the fourth proportional to 4, 9, 12.", options: ["18", "27", "36", "48"], correctAnswer: "27", explanation: "4/9 = 12/x => 4x = 108 => x = 27.", difficulty: "Beginner" },
            { id: 'rp2', questionText: "Find the triplicate ratio of 2:3.", options: ["4:9", "8:27", "√2:√3", "6:9"], correctAnswer: "8:27", explanation: "Triplicate ratio is a³:b³ = 2³:3³ = 8:27.", difficulty: "Beginner" },
            { id: 'rp3', questionText: "A bag contains 50p, 25p and 10p coins in ratio 5:9:4 amounting to Rs. 206. Find number of 50p coins.", options: ["200", "360", "160", "400"], correctAnswer: "200", explanation: "Value ratio = (5*0.5):(9*0.25):(4*0.1) = 2.5 : 2.25 : 0.4 = 250:225:40 = 50:45:8. Sum = 103 units. 103u=206 => 1u=2. Coins = 50*4 = 200.", difficulty: "Intermediate" },
            { id: 'rp4', questionText: "Ratio of ages of A and B is 3:4. After 10 years, it becomes 4:5. Find sum of current ages.", options: ["60", "70", "80", "90"], correctAnswer: "70", explanation: "Let ages be 3x, 4x. (3x+10)/(4x+10) = 4/5 => 15x+50 = 16x+40 => x=10. Current ages 30, 40. Sum = 70.", difficulty: "Intermediate" },
            { id: 'rp5', questionText: "A and B start a business. A invests Rs 3000 for 8 months and B invests Rs 4000 for 6 months. Ratio of profit?", options: ["1:1", "3:4", "2:3", "4:3"], correctAnswer: "1:1", explanation: "Profit ratio = (3000*8):(4000*6) = 24000:24000 = 1:1.", difficulty: "Beginner" },
            { id: 'rp6', questionText: "Find the mean proportional between 4 and 9.", options: ["6", "6.5", "13", "36"], correctAnswer: "6", explanation: "Mean prop = √(a*b) = √(4*9) = √36 = 6.", difficulty: "Beginner" },
            { id: 'rp7', questionText: "If the duplicate ratio of a:b is 16:25, find a:b.", options: ["4:5", "2:3", "256:625", "√4:√5"], correctAnswer: "4:5", explanation: "Duplicate ratio is a²:b². √16:√25 = 4:5.", difficulty: "Beginner" },
            { id: 'rp8', questionText: "A and B entered into a partnership and A is a working partner. For this he gets 10% of profit. If total profit is Rs 1000 and their investments are equal, find A's share.", options: ["Rs 550", "Rs 600", "Rs 500", "Rs 450"], correctAnswer: "Rs 550", explanation: "Working charge = 10% of 1000 = 100. Remaining = 900. Shared equally = 450 each. A gets 100+450 = 550.", difficulty: "Intermediate" },
            { id: 'rp9', questionText: "Ratio of income of A and B is 5:4 and their expenditure is 3:2. If each saves Rs 1600, find income of A.", options: ["Rs 4000", "Rs 4500", "Rs 3200", "Rs 5000"], correctAnswer: "Rs 4000", explanation: "Let income be 5x, 4x. Savings are same. Difference in ratio is 2 (5-3 and 4-2). 2 units = 1600 => 1 unit = 800. Income A = 5*800 = 4000.", difficulty: "Intermediate" },
            { id: 'rp10', questionText: "Sub-duplicate ratio of 49:81 is?", options: ["7:9", "2401:6561", "14:18", "3.5:4.5"], correctAnswer: "7:9", explanation: "Sub-duplicate is √a:√b = √49:√81 = 7:9.", difficulty: "Beginner" }
        ]
    },
    'Mixture and Alligations': {
        explanation: "Mixture and Alligation helps solve problems involving combinations of two or more entities. Key concepts: Rule of Alligation (Mean Price), mixing materials of different costs, and repeated process of removal and replacement.",
        explanation_tamil: "கலவை மற்றும் அலிகேஷன் என்பது இரண்டு அல்லது அதற்கு மேற்பட்ட பொருட்களை இணைக்கும் கணக்குகளைத் தீர்க்க உதவுகிறது. இது சராசரி விலை மற்றும் பொருட்களைத் திரும்பத் திரும்ப மாற்றும் கணக்குகளை உள்ளடக்கியது.",
        explanation_telugu: "మిశ్రమము మరియు అలిగేషన్ రెండు లేదా అంతకంటే ఎక్కువ వస్తువుల కలయికకు సంబంధించిన సమస్యలను పరిష్కరించడానికి ఉపయోగపడుతుంది. ఇందులో సగటు ధర మరియు పునరావృత తొలగింపు సమస్యలు ఉంటాయి.",
        workedExample: {
            problem: "In what ratio must rice at $10/kg be mixed with rice at $15/kg to get a mixture worth $12/kg?",
            solution: "By Alligation rule: \nRatio = (Price of dearer - Mean price) : (Mean price - Price of cheaper) \nRatio = (15 - 12) : (12 - 10) = 3 : 2."
        },
        questions: [
            { id: 'ma1', questionText: "In what ratio must tea at Rs. 62/kg be mixed with tea at Rs. 72/kg so that the mixture is worth Rs. 64.50/kg?", options: ["3:1", "3:2", "4:3", "5:3"], correctAnswer: "3:1", explanation: "Ratio = (72 - 64.5) : (64.5 - 62) = 7.5 : 2.5 = 3:1.", difficulty: "Beginner" },
            { id: 'ma2', questionText: "A vessel contains 60L of milk. 6L is replaced by water. This is done two more times. Remaining milk amount?", options: ["43.74L", "54L", "48.6L", "40.5L"], correctAnswer: "43.74L", explanation: "Remain = Total * (1 - r/T)^n = 60 * (1 - 6/60)^3 = 60 * (0.9)^3 = 60 * 0.729 = 43.74L.", difficulty: "Advanced" },
            { id: 'ma3', questionText: "How much water must be added to 60L of milk worth Rs 20/L to reduce its price to Rs 15/L?", options: ["20L", "15L", "10L", "30L"], correctAnswer: "20L", explanation: "Ratio milk:water = (15-0):(20-15) = 15:5 = 3:1. For 60L milk, need 20L water.", difficulty: "Intermediate" },
            { id: 'ma4', questionText: "A container has 40L of milk. 4L is taken out and replaced with water. If this is done total twice, final milk:water ratio?", options: ["81:19", "9:1", "18:2", "4:1"], correctAnswer: "81:19", explanation: "Remaining = 40 * (36/40)^2 = 40 * 0.81 = 32.4. Water = 40 - 32.4 = 7.6. Ratio 32.4:7.6 = 81:19.", difficulty: "Advanced" },
            { id: 'ma5', questionText: "Average speed of a journey is 40 kmph. One part at 30 kmph and other at 60 kmph. Ratio of time spent?", options: ["2:1", "1:2", "1:1", "3:2"], correctAnswer: "2:1", explanation: "By alligation on speed: Ratio of time = (60-40):(40-30) = 20:10 = 2:1.", difficulty: "Intermediate" },
            { id: 'ma6', questionText: "Two jars have milk and water in ratios 5:2 and 7:6. To get 8:5 ratio, in what proportion should they mix?", options: ["7:9", "9:7", "1:1", "3:4"], correctAnswer: "7:9", explanation: "Using milk fractions: (5/7), (7/13), Mean (8/13). Ratio = (8/13 - 7/13) : (5/7 - 8/13) = (1/13) : (9/91) = 7:9.", difficulty: "Advanced" },
            { id: 'ma7', questionText: "Find average price of a mixture of 10kg grain at Rs 30 and 20kg at Rs 60.", options: ["Rs 50", "Rs 45", "Rs 40", "Rs 55"], correctAnswer: "Rs 50", explanation: "Weighted avg = (10*30 + 20*60) / 30 = (300 + 1200) / 30 = 50.", difficulty: "Beginner" },
            { id: 'ma8', questionText: "A person travelled 80km in 7 hours. Partly at 8 kmph and partly at 16 kmph. Distance covered at 8 kmph?", options: ["32 km", "48 km", "40 km", "30 km"], correctAnswer: "32 km", explanation: "Avg speed = 80/7. Ratio of time = (16-80/7):(80/7-8) = (32/7):(24/7) = 4:3. Time at 8kmph = (4/7)*7 = 4h. Dist = 4*8 = 32km.", difficulty: "Advanced" },
            { id: 'ma9', questionText: "Ratio of milk and water in a mixture is 7:5. If 15L of water is added, ratio becomes 7:8. Amount of milk?", options: ["35L", "25L", "40L", "20L"], correctAnswer: "35L", explanation: "Milk 7x, Water 5x. 7x/(5x+15) = 7/8 => 8x = 5x+15 => 3x=15 => x=5. Milk = 7*5 = 35L.", difficulty: "Intermediate" },
            { id: 'ma10', questionText: "Gold is 19 times as heavy as water and copper is 9 times as heavy. In what ratio must they mix to be 15 times heavier than water?", options: ["3:2", "2:3", "1:1", "4:1"], correctAnswer: "3:2", explanation: "Ratio = (15-9):(19-15) = 6:4 = 3:2.", difficulty: "Beginner" }
        ]
    },

    // TECHNICAL SECTION - EXPANDED
    'Time Complexity': {
        explanation: "Time Complexity measures the time an algorithm takes to run as a function of the length of the input. Big-O notation is used to describe the worst-case scenario, while Omega and Theta describe best and average cases.",
        workedExample: {
            problem: "What is the time complexity of a nested loop where both loops run 'n' times?",
            solution: "The outer loop runs n times. For each outer iteration, the inner loop runs n times. Total iterations = n * n = n². Complexity is O(n²)."
        },
        questions: [
            { id: 'tc1', questionText: "Which complexity is more efficient?", options: ["O(n)", "O(n²)", "O(log n)", "O(2ⁿ)"], correctAnswer: "O(log n)", explanation: "Logarithmic time grows much slower than linear or quadratic time.", difficulty: "Beginner" },
            { id: 'tc2', questionText: "Worst case time complexity of Binary Search is?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correctAnswer: "O(log n)", explanation: "Binary search halves the search space in each step.", difficulty: "Beginner" },
            { id: 'tc3', questionText: "What is the time complexity of accessing an element in an array?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: "O(1)", explanation: "Arrays provide constant time access via indexing.", difficulty: "Beginner" },
            { id: 'tc4', questionText: "Complexity of a loop that runs from 1 to n, but jumps by i = i*2?", options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"], correctAnswer: "O(log n)", explanation: "Exponential growth in index leads to logarithmic number of steps.", difficulty: "Intermediate" },
            { id: 'tc5', questionText: "Which of the following is the slowest growth rate?", options: ["O(n!)", "O(2ⁿ)", "O(n³)", "O(n log n)"], correctAnswer: "O(n!)", explanation: "Factorial growth is the fastest (slowest execution) in Big-O.", difficulty: "Intermediate" },
            { id: 'tc6', questionText: "What is the time complexity of Quick Sort in the worst case?", options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"], correctAnswer: "O(n²)", explanation: "Worst case occurs with poor pivot selection (e.g., sorted array).", difficulty: "Intermediate" },
            { id: 'tc7', questionText: "Complexity of Merge Sort in all cases?", options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"], correctAnswer: "O(n log n)", explanation: "Merge sort is consistently O(n log n) due to divide and conquer.", difficulty: "Beginner" },
            { id: 'tc8', questionText: "Space complexity of a recursive Fibonacci function (naive)?", options: ["O(1)", "O(n)", "O(2ⁿ)", "O(log n)"], correctAnswer: "O(n)", explanation: "The depth of the recursion stack is linear with n.", difficulty: "Advanced" },
            { id: 'tc9', questionText: "Which notation represents the average case of an algorithm?", options: ["Big-O", "Big-Omega", "Big-Theta", "Little-o"], correctAnswer: "Big-Theta", explanation: "Theta represents the tight bound (average case).", difficulty: "Intermediate" },
            { id: 'tc10', questionText: "Time complexity of building a heap from an array of size n?", options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"], correctAnswer: "O(n)", explanation: "Building a heap using heapify takes linear time.", difficulty: "Advanced" },
            { id: 'tc11', questionText: "Complexity of searching in a Balanced Binary Search Tree?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], correctAnswer: "O(log n)", explanation: "Height of a balanced tree is logarithmic.", difficulty: "Intermediate" },
            { id: 'tc12', questionText: "Complexity of removing an element from a Hash Map (average)?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], correctAnswer: "O(1)", explanation: "Hashing provides constant time deletion on average.", difficulty: "Beginner" },
            { id: 'tc13', questionText: "If f(n) = 3n² + 5n + 10, what is f(n) in Big-O?", options: ["O(3n²)", "O(n²)", "O(n)", "O(n³)"], correctAnswer: "O(n²)", explanation: "Big-O neglects constants and lower-order terms.", difficulty: "Beginner" },
            { id: 'tc14', questionText: "Complexity of finding the maximum element in an unsorted array?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correctAnswer: "O(n)", explanation: "Must check every element at least once.", difficulty: "Beginner" },
            { id: 'tc15', questionText: "Complexity of Tower of Hanoi problem?", options: ["O(n²)", "O(2ⁿ)", "O(n!)", "O(n)"], correctAnswer: "O(2ⁿ)", explanation: "Requires 2ⁿ - 1 moves.", difficulty: "Advanced" }
        ]
    },
    'Arrays': {
        explanation: "Arrays are contiguous memory locations to store similar types of data. Accessing elements by index is extremely fast, but inserting or deleting elements can be slow as it might require shifting other elements.",
        workedExample: {
            problem: "Find the element at index 2 in array [10, 20, 30, 40].",
            solution: "Indexing starts at 0. \nIndex 0: 10 \nIndex 1: 20 \nIndex 2: 30 \nAnswer: 30."
        },
        questions: [
            { id: 'ar1', questionText: "Access time for an array element by index is?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correctAnswer: "O(1)", explanation: "Direct indexing is constant time.", difficulty: "Beginner" },
            { id: 'ar2', questionText: "If an array has size 10, what is the index of the last element?", options: ["10", "11", "9", "0"], correctAnswer: "9", explanation: "Array indexing starts from 0, so last index is size-1.", difficulty: "Beginner" },
            { id: 'ar3', questionText: "What happens if you try to access an index outside array bounds?", options: ["Returns 0", "Runtime Error / Garbage value", "Array expands", "Nothing"], correctAnswer: "Runtime Error / Garbage value", explanation: "Accessing out-of-bounds is illegal memory access.", difficulty: "Beginner" },
            { id: 'ar4', questionText: "Complexity of inserting an element at the beginning of an array of size n?", options: ["O(1)", "O(n)", "O(log n)", "O(1) amortized"], correctAnswer: "O(n)", explanation: "Every existing element must be shifted right.", difficulty: "Intermediate" },
            { id: 'ar5', questionText: "Which array stores data in rows and columns?", options: ["1D Array", "Jagged Array", "2D Array", "Static Array"], correctAnswer: "2D Array", explanation: "2D arrays mimic matrices/grids.", difficulty: "Beginner" },
            { id: 'ar6', questionText: "How many elements in a 2D array of size [3][4]?", options: ["7", "12", "10", "15"], correctAnswer: "12", explanation: "Rows * Columns = 3 * 4 = 12.", difficulty: "Beginner" },
            { id: 'ar7', questionText: "Which technique is used to find a sub-array sum efficiently?", options: ["Two Pointers", "Sliding Window", "Hashing", "Dynamic Programming"], correctAnswer: "Sliding Window", explanation: "Sliding window avoids redundant calculations.", difficulty: "Intermediate" },
            { id: 'ar8', questionText: "Base address of array starts at 1000. Size of int is 4. Address of arr[5] is?", options: ["1005", "1020", "1024", "1004"], correctAnswer: "1020", explanation: "1000 + (5 * 4) = 1020.", difficulty: "Intermediate" },
            { id: 'ar9', questionText: "Reversing an array of size n takes how much time?", options: ["O(1)", "O(n)", "O(n²)", "O(log n)"], correctAnswer: "O(n)", explanation: "Requires n/2 swaps, which is linear.", difficulty: "Beginner" },
            { id: 'ar10', questionText: "Which is the most memory-efficient way to represent a sparse matrix?", options: ["Standard 2D Array", "Linked List", "Adjacency List", "Compressed Sparse Row"], correctAnswer: "Compressed Sparse Row", explanation: "CSR stores only non-zero values.", difficulty: "Advanced" },
            { id: 'ar11', questionText: "A three-dimensional array A[2][2][2] has how many elements?", options: ["6", "8", "4", "12"], correctAnswer: "8", explanation: "2 * 2 * 2 = 8.", difficulty: "Beginner" },
            { id: 'ar12', questionText: "Which operation is not possible on a static array after creation?", options: ["Modification", "Traversing", "Resizing", "Sorting"], correctAnswer: "Resizing", explanation: "Static arrays have a fixed size defined at compile/runtime.", difficulty: "Beginner" },
            { id: 'ar13', questionText: "Complexity to delete the last element from an array?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: "O(1)", explanation: "No shifting required if deleting from the end.", difficulty: "Beginner" },
            { id: 'ar14', questionText: "Time complexity to find duplicates in an array using a hash table?", options: ["O(n)", "O(n²)", "O(n log n)", "O(1)"], correctAnswer: "O(n)", explanation: "Linear traversal with constant time lookups.", difficulty: "Intermediate" },
            { id: 'ar15', questionText: "Array index in major programming languages like C, Java, Python starts at?", options: ["1", "0", "-1", "Any"], correctAnswer: "0", explanation: "Zero-based indexing is the industry standard.", difficulty: "Beginner" }
        ]
    },
    'Strings': {
        explanation: "Strings are sequences of characters. Common operations include concatenation, substring extraction, and searching. Key problems include checking for Palindromes (reads same forwards and backwards) and Anagrams (contains same characters in different order).",
        workedExample: {
            problem: "Check if 'racecar' is a palindrome.",
            solution: "The word reversed is 'racecar'. Since original == reversed, it is a palindrome."
        },
        questions: [
            { id: 'st1', questionText: "Which of these is a palindrome?", options: ["hello", "madam", "world", "coding"], correctAnswer: "madam", explanation: "'madam' read backwards is still 'madam'.", difficulty: "Beginner" },
            { id: 'st2', questionText: "What is an anagram of 'listen'?", options: ["silent", "list", "tent", "line"], correctAnswer: "silent", explanation: "Both 'listen' and 'silent' use the same set of characters.", difficulty: "Beginner" },
            { id: 'st3', questionText: "Which character is used to terminate a string in C?", options: ["\\t", "\\n", "\\0", "\\s"], correctAnswer: "\\0", explanation: "Null character '\\0' marks the end of a string.", difficulty: "Beginner" },
            { id: 'st4', questionText: "Complexity of finding length of a string of n characters?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: "O(n)", explanation: "Must count until null terminator is reached.", difficulty: "Beginner" },
            { id: 'st5', questionText: "Which of the following describes immutable strings?", options: ["They cannot be created", "They cannot be changed after creation", "They cannot be deleted", "They can be changed easily"], correctAnswer: "They cannot be changed after creation", explanation: "In languages like Java/Python, strings are immutable.", difficulty: "Intermediate" },
            { id: 'st6', questionText: "Complexity of concatenating two strings of length m and n?", options: ["O(m+n)", "O(m*n)", "O(1)", "O(log n)"], correctAnswer: "O(m+n)", explanation: "Must copy both strings to a new location.", difficulty: "Intermediate" },
            { id: 'st7', questionText: "What is the result of 'abc'.substring(1, 2)?", options: ["a", "b", "bc", "ab"], correctAnswer: "b", explanation: "Index 1 is 'b'. End index 2 is exclusive.", difficulty: "Beginner" },
            { id: 'st8', questionText: "Which algorithm is used for efficient string pattern matching?", options: ["Binary Search", "KMP Algorithm", "Dijkstra", "Bubble Sort"], correctAnswer: "KMP Algorithm", explanation: "Knuth-Morris-Pratt avoids redundant shifts.", difficulty: "Advanced" },
            { id: 'st9', questionText: "Time complexity of checking if two strings of length n are anagrams using sorting?", options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"], correctAnswer: "O(n log n)", explanation: "Sorting characters takes O(n log n).", difficulty: "Intermediate" },
            { id: 'st10', questionText: "ASCII value of 'A'?", options: ["97", "65", "48", "100"], correctAnswer: "65", explanation: "Uppercase A is 65.", difficulty: "Beginner" },
            { id: 'st11', questionText: "How many substrings in a string of length n?", options: ["n", "n(n+1)/2", "2ⁿ", "n²"], correctAnswer: "n(n+1)/2", explanation: "Combination formula for non-empty substrings.", difficulty: "Advanced" },
            { id: 'st12', questionText: "Complexity of finding a character in a string (worst case)?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: "O(n)", explanation: "Linear search might check every char.", difficulty: "Beginner" },
            { id: 'st13', questionText: "Which data structure is best for storing a dictionary of words for fast lookup?", options: ["Array", "Linked List", "Trie", "Stack"], correctAnswer: "Trie", explanation: "Tries (Prefix trees) are optimized for string search.", difficulty: "Advanced" },
            { id: 'st14', questionText: "Result of '5' + '5' in most loosely typed languages?", options: ["10", "55", "Error", "None"], correctAnswer: "55", explanation: "String concatenation takes precedence.", difficulty: "Beginner" },
            { id: 'st15', questionText: "Two pointers technique can check palindrome in what time?", options: ["O(n²)", "O(n)", "O(1)", "O(log n)"], correctAnswer: "O(n)", explanation: "Linear scan inward from both ends.", difficulty: "Beginner" }
        ]
    },
    'Searching': {
        explanation: "Searching algorithms find the position of a target value within a structure. Linear Search checks every element, whereas Binary Search requires a sorted list to divide and conquer the search space.",
        workedExample: {
            problem: "Search for 7 in sorted array [1, 3, 5, 7, 9] using Binary Search.",
            solution: "1. Mid is 5. 7 > 5, search right. \n2. New range [7, 9]. Mid is 7. \n3. Found at index 3."
        },
        questions: [
            { id: 'sc1', questionText: "Linear search has a time complexity of?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: "O(n)", explanation: "In the worst case, you must check every element once.", difficulty: "Beginner" },
            { id: 'sc2', questionText: "Binary search works on which type of arrays?", options: ["Unsorted", "Sorted", "Any", "Small"], correctAnswer: "Sorted", explanation: "Binary search depends on the ordering to eliminate half the space.", difficulty: "Beginner" },
            { id: 'sc3', questionText: "What is the requirement for Binary Search?", options: ["Index access", "Sorted list", "Large data", "Small data"], correctAnswer: "Sorted list", explanation: "Logic breaks if data is not ordered.", difficulty: "Beginner" },
            { id: 'sc4', questionText: "Number of comparisons in Linear Search for n elements (avg)?", options: ["n", "n/2", "log n", "1"], correctAnswer: "n/2", explanation: "Average case for target found in list.", difficulty: "Beginner" },
            { id: 'sc5', questionText: "Best case time complexity for Linear Search?", options: ["O(1)", "O(n)", "O(log n)", "O(0)"], correctAnswer: "O(1)", explanation: "Target found at the very first index.", difficulty: "Beginner" },
            { id: 'sc6', questionText: "Maximum comparisons in Binary Search for array of 16 elements?", options: ["16", "8", "4", "5"], correctAnswer: "5", explanation: "log2(16) = 4, +1 for unsuccessful or final check = 5.", difficulty: "Intermediate" },
            { id: 'sc7', questionText: "Space complexity of Iterative Binary Search?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: "O(1)", explanation: "Requires only a few variables like low, high, mid.", difficulty: "Intermediate" },
            { id: 'sc8', questionText: "Which search is better for Linked Lists?", options: ["Binary Search", "Linear Search", "Both equal", "Jump Search"], correctAnswer: "Linear Search", explanation: "Linked Lists do not support O(1) random access needed for mid calculation.", difficulty: "Intermediate" },
            { id: 'sc9', questionText: "Interpolation search is faster than Binary search when?", options: ["Data is uniform", "Data is large", "Data is sorted", "Data is unsorted"], correctAnswer: "Data is uniform", explanation: "Calculates probable position based on value distribution.", difficulty: "Advanced" },
            { id: 'sc10', questionText: "Jump search complexity?", options: ["O(n)", "O(√n)", "O(log n)", "O(1)"], correctAnswer: "O(√n)", explanation: "Optimized for skip-search in sorted arrays.", difficulty: "Advanced" },
            { id: 'sc11', questionText: "Hashing provides search in what average time?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], correctAnswer: "O(1)", explanation: "Keys map directly to indices.", difficulty: "Beginner" },
            { id: 'sc12', questionText: "Exponential search uses which other search internally?", options: ["Linear Search", "Binary Search", "Bubble Sort", "Ternary Search"], correctAnswer: "Binary Search", explanation: "Finds range exponentially, then binary searches inside.", difficulty: "Advanced" },
            { id: 'sc13', questionText: "Which search checks indices 1, 2, 4, 8, 16...?", options: ["Binary Search", "Exponential Search", "Fibonacci Search", "Jump Search"], correctAnswer: "Exponential Search", explanation: "Range doubling technique.", difficulty: "Intermediate" },
            { id: 'sc14', questionText: "Search algorithm used in SQL 'WHERE ID = 50' on a Primary Key index?", options: ["Linear Search", "B-Tree / Hash Search", "Bubble Search", "Sequential Search"], correctAnswer: "B-Tree / Hash Search", explanation: "Databases use indexed binary structures.", difficulty: "Intermediate" },
            { id: 'sc15', questionText: "Complexity of searching for a value in a sorted 2D array of size n x n?", options: ["O(n²)", "O(n)", "O(log n²)", "O(1)"], correctAnswer: "O(n)", explanation: "Staircase search starting from corner.", difficulty: "Advanced" }
        ]
    },
    'Sorting': {
        explanation: "Sorting arranges elements in a specific order (ascending or descending). Basic algorithms include Bubble and Selection sort. Advanced ones like Quick and Merge sort use partitioning and merging for better efficiency.",
        workedExample: {
            problem: "Perform one pass of Bubble Sort on [5, 1, 4].",
            solution: "1. Compare 5 and 1: Swap -> [1, 5, 4] \n2. Compare 5 and 4: Swap -> [1, 4, 5] \nResult: [1, 4, 5]."
        },
        questions: [
            { id: 'so1', questionText: "What is the worst-case complexity of Bubble Sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correctAnswer: "O(n²)", explanation: "Nested loops cause quadratic time in the worst case.", difficulty: "Beginner" },
            { id: 'so2', questionText: "Which sorting algorithm uses Divide and Conquer?", options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"], correctAnswer: "Merge Sort", explanation: "Merge sort recursively divides the array and then merges them.", difficulty: "Beginner" },
            { id: 'so3', questionText: "Best case time complexity of Insertion Sort?", options: ["O(n²)", "O(n)", "O(n log n)", "O(1)"], correctAnswer: "O(n)", explanation: "Occurs when array is already sorted.", difficulty: "Intermediate" },
            { id: 'so4', questionText: "Which sort is stable by default?", options: ["Quick Sort", "Selection Sort", "Merge Sort", "Heap Sort"], correctAnswer: "Merge Sort", explanation: "Stability means relative order of equal elements is preserved.", difficulty: "Intermediate" },
            { id: 'so5', questionText: "Which sort has the lowest space complexity among O(n log n) sorts?", options: ["Merge Sort", "Heap Sort", "Quick Sort", "Radix Sort"], correctAnswer: "Heap Sort", explanation: "Heap sort is in-place O(1) space.", difficulty: "Advanced" },
            { id: 'so6', questionText: "Pivot element is a concept in?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Insertion Sort"], correctAnswer: "Quick Sort", explanation: "Uses partitioning around a pivot.", difficulty: "Beginner" },
            { id: 'so7', questionText: "Which sort is best for small or nearly sorted arrays?", options: ["Insertion Sort", "Quick Sort", "Selection Sort", "Merge Sort"], correctAnswer: "Insertion Sort", explanation: "Low overhead and efficient for small sets.", difficulty: "Intermediate" },
            { id: 'so8', questionText: "Time complexity of Selection Sort in all cases?", options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"], correctAnswer: "O(n²)", explanation: "Always performs n² comparisons to find min.", difficulty: "Beginner" },
            { id: 'so9', questionText: "Worst case of Quick Sort occurs when?", options: ["Pivot is median", "Array is sorted", "Array is random", "Array is small"], correctAnswer: "Array is sorted", explanation: "Partitioning becomes unbalanced.", difficulty: "Intermediate" },
            { id: 'so10', questionText: "Radix sort is based on?", options: ["Comparing values", "Digits positions", "Divide and conquer", "Pivoting"], correctAnswer: "Digits positions", explanation: "Non-comparative sorting.", difficulty: "Advanced" },
            { id: 'so11', questionText: "An in-place sorting algorithm uses how much extra space?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: "O(1)", explanation: "Only uses a constant amount of extra memory.", difficulty: "Intermediate" },
            { id: 'so12', questionText: "Which algorithm is used by Python's sort() and Java's Arrays.sort()?", options: ["Quick Sort", "Merge Sort", "TimSort", "Heap Sort"], correctAnswer: "TimSort", explanation: "Hybrid of Merge and Insertion Sort.", difficulty: "Advanced" },
            { id: 'so13', questionText: "Counting sort works in O(n+k) where k is?", options: ["Number of elements", "Range of values", "Buckets", "Depth"], correctAnswer: "Range of values", explanation: "Efficient only when range k is small.", difficulty: "Advanced" },
            { id: 'so14', questionText: "Which sort reduces number of swaps to minimum?", options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort"], correctAnswer: "Selection Sort", explanation: "Performs at most O(n) swaps.", difficulty: "Intermediate" },
            { id: 'so15', questionText: "External sorting is used when?", options: ["Data is in memory", "Data is too large for RAM", "Data is sorted", "Data is strings"], correctAnswer: "Data is too large for RAM", explanation: "Uses disk storage and merging logic.", difficulty: "Advanced" }
        ]
    },
    'Recursion': {
        explanation: "Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. A base case is essential to prevent infinite loops.",
        workedExample: {
            problem: "Find factorial of 3 using recursion.",
            solution: "fact(3) = 3 * fact(2) = 3 * 2 * fact(1) = 3 * 2 * 1 = 6."
        },
        questions: [
            { id: 're1', questionText: "What happens if a recursive function has no base case?", options: ["It runs once", "Stack Overflow", "It returns 0", "Compile error"], correctAnswer: "Stack Overflow", explanation: "Infinite calls will eventually exhaust the recursion stack memory.", difficulty: "Beginner" },
            { id: 're2', questionText: "Fibonacci sequence: 1, 1, 2, 3, 5... what is the next term?", options: ["6", "7", "8", "10"], correctAnswer: "8", explanation: "3 + 5 = 8.", difficulty: "Beginner" }
        ]
    },
    'Stack': {
        explanation: "A Stack is a linear data structure that follows the LIFO (Last In, First Out) principle. Common operations are Push (add) and Pop (remove). Applications include function calls, undo mechanisms, and expression parsing.",
        workedExample: {
            problem: "If we Push 10, then Push 20, then Pop. What is the state of stack?",
            solution: "1. Push 10: [10] \n2. Push 20: [10, 20] \n3. Pop: removes 20. \nFinal Stack: [10]."
        },
        questions: [
            { id: 'sk1', questionText: "Which principle does a Stack follow?", options: ["FIFO", "LIFO", "LILO", "Random"], correctAnswer: "LIFO", explanation: "Last In, First Out.", difficulty: "Beginner" },
            { id: 'sk2', questionText: "Operation to remove an element from stack is?", options: ["Push", "Pop", "Enqueue", "Peek"], correctAnswer: "Pop", explanation: "Pop removes the top element.", difficulty: "Beginner" }
        ]
    },
    'Queue': {
        explanation: "A Queue follows the FIFO (First In, First Out) principle. Elements are added at the 'rear' and removed from the 'front'. Variations include Circular Queues and Priority Queues.",
        workedExample: {
            problem: "If we Enqueue 10, Enqueue 20, then Dequeue. Who left first?",
            solution: "1. Enqueue 10: [10] \n2. Enqueue 20: [10, 20] \n3. Dequeue: removes Front (10). \nAnswer: 10."
        },
        questions: [
            { id: 'qu1', questionText: "Which principle does a Queue follow?", options: ["LIFO", "FIFO", "FILO", "Random"], correctAnswer: "FIFO", explanation: "First In, First Out.", difficulty: "Beginner" },
            { id: 'qu2', questionText: "Where are new elements added in a queue?", options: ["Front", "Middle", "Rear", "Top"], correctAnswer: "Rear", explanation: "Enqueue operation happens at the rear/back.", difficulty: "Beginner" }
        ]
    },
    'Linked List': {
        explanation: "A Linked List is a dynamic data structure where each element (node) contains data and a reference (pointer) to the next node. Singly linked lists point one way, while doubly linked lists point both ways.",
        workedExample: {
            problem: "How do you reach the 3rd node in a Singly Linked List?",
            solution: "Start at Head. \nFollow Head->Next (2nd node). \nFollow 2nd->Next (3rd node)."
        },
        questions: [
            { id: 'll1', questionText: "Time complexity to search an element in a linked list of size n?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], correctAnswer: "O(n)", explanation: "You must traverse from the head until the element is found.", difficulty: "Beginner" },
            { id: 'll2', questionText: "What does the 'next' pointer of the last node in a singly linked list point to?", options: ["Head", "Previous node", "Null/None", "Itself"], correctAnswer: "Null/None", explanation: "The end of the list is marked by a null pointer.", difficulty: "Beginner" }
        ]
    },
    'Trees': {
        explanation: "A Tree is a hierarchical structure with a root node and children nodes. A Binary Tree has at most two children per node. Binary Search Trees (BST) keep nodes ordered for efficient searching.",
        workedExample: {
            problem: "Where would you insert 5 in a BST with Root 10?",
            solution: "In BST, left child < Parent. Since 5 < 10, insert in the Left subtree of 10."
        },
        questions: [
            { id: 'tr1', questionText: "Maximum number of children a node can have in a Binary Tree?", options: ["1", "2", "Unlimited", "0"], correctAnswer: "2", explanation: "A 'Binary' tree is restricted to two children.", difficulty: "Beginner" },
            { id: 'tr2', questionText: "The topmost node of a tree is called?", options: ["Leaf", "Stem", "Root", "Branch"], correctAnswer: "Root", explanation: "The root is the entry point of the tree structure.", difficulty: "Beginner" }
        ]
    },
    'Hashing': {
        explanation: "Hashing maps data to a fixed-size value (hash code) using a hash function. It allows for efficient data retrieval in Map and Set structures, often in average O(1) time.",
        workedExample: {
            problem: "Map 'Key=5' to an array of size 10 using H(k) = k % 10.",
            solution: "Index = 5 % 10 = 5. \nThe data will be stored at index 5."
        },
        questions: [
            { id: 'ha1', questionText: "Average time complexity for searching in a Hash Map?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: "O(1)", explanation: "Hashing provides direct access via keys.", difficulty: "Beginner" },
            { id: 'ha2', questionText: "What is it called when two keys hash to the same value?", options: ["Conflict", "Collision", "Matching", "Overlay"], correctAnswer: "Collision", explanation: "Hash collisions must be handled using techniques like chaining or open addressing.", difficulty: "Beginner" }
        ]
    },
    'OOPS': {
        explanation: "Object-Oriented Programming (OOPS) is based on 'objects' and 'classes'. Core pillars are Encapsulation (data hiding), Abstraction (hiding complexity), Inheritance (reusing code), and Polymorphism (many forms).",
        workedExample: {
            problem: "Give an example of Inheritance.",
            solution: "A 'Car' class inheriting properties from a 'Vehicle' class. Car is a specific type of Vehicle."
        },
        questions: [
            { id: 'oo1', questionText: "Hiding internal details and showing only functionality is?", options: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"], correctAnswer: "Abstraction", explanation: "Abstraction focuses on 'what' it does rather than 'how'.", difficulty: "Beginner" },
            { id: 'oo4', questionText: "Combining data and methods into a single unit is?", options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"], correctAnswer: "Encapsulation", explanation: "Encapsulation wraps data and code together.", difficulty: "Beginner" }
        ]
    },
    'Functions': {
        explanation: "Functions are reusable blocks of code. They can take parameters (inputs) and return values. 'Call by value' passes a copy of the data, while 'Call by reference' passes the address.",
        workedExample: {
            problem: "What is the output of: func add(a, b) { return a+b }; add(2, 3)?",
            solution: "a=2, b=3. Return 2+3 = 5."
        },
        questions: [
            { id: 'fn1', questionText: "A function that does not return any value usually has return type?", options: ["int", "void", "null", "empty"], correctAnswer: "void", explanation: "'void' signifies no return value.", difficulty: "Beginner" },
            { id: 'fn2', questionText: "What is 'Scope' of a variable?", options: ["Its lifetime", "Region where it's accessible", "Its memory size", "Its data type"], correctAnswer: "Region where it's accessible", explanation: "Scope defines the boundaries within which a variable can be used.", difficulty: "Beginner" }
        ]
    },
    'DBMS Basics': {
        explanation: "Database Management Systems (DBMS) organize and manage data. Relational databases use Tables, Primary Keys (uniquely identify rows), and Foreign Keys (link tables). SQL is used to query these databases.",
        workedExample: {
            problem: "Which key is used to connect a 'Orders' table to a 'Customers' table?",
            solution: "The 'Customer_ID' which is a Primary Key in Customers table would be a **Foreign Key** in the Orders table."
        },
        questions: [
            { id: 'db1', questionText: "Which key uniquely identifies a record in a table?", options: ["Foreign Key", "Primary Key", "Composite Key", "Unique Key"], correctAnswer: "Primary Key", explanation: "Every table must have a Primary Key for row identification.", difficulty: "Beginner" },
            { id: 'db2', questionText: "What does SQL stand for?", options: ["Simple Query Logic", "Structured Query Language", "Standard Query Level", "System Query Link"], correctAnswer: "Structured Query Language", explanation: "The standard language for RDBMS.", difficulty: "Beginner" }
        ]
    },
    'OS Basics': {
        explanation: "Operating Systems (OS) manage hardware and software resources. Core concepts include Processes (running programs), Threads (units of execution within a process), and Memory Management.",
        workedExample: {
            problem: "If multiple tasks run on a single CPU core, how does it look like they run at once?",
            solution: "The OS uses **Time Slicing** (Context Switching) to rapidly swap between processes."
        },
        questions: [
            { id: 'os1', questionText: "A process that is currently being executed is in which state?", options: ["Ready", "Running", "Waiting", "Terminated"], correctAnswer: "Running", explanation: "Running state means it's using the CPU.", difficulty: "Beginner" },
            { id: 'os2', questionText: "Process vs Thread: Which shares the same memory space?", options: ["Processes", "Threads", "Both", "Neither"], correctAnswer: "Threads", explanation: "Threads of the same process share memory, making them lightweight.", difficulty: "Beginner" }
        ]
    },

    // LOGICAL SECTION - EXPANDED
    'Number Series': {
        explanation: "Number series are sequences of numbers following a specific mathematical pattern like addition, square, prime numbers, or multi-step logic.",
        workedExample: {
            problem: "Find next: 2, 6, 12, 20, ?",
            solution: "Gaps are +4, +6, +8. Next gap is +10. 20 + 10 = 30."
        },
        questions: [
            { id: 'ns1', questionText: "Find the next number: 1, 4, 9, 16, ?", options: ["20", "24", "25", "36"], correctAnswer: "25", explanation: "Squares of natural numbers: 1², 2², 3², 4², 5²=25.", difficulty: "Beginner" },
            { id: 'ns2', questionText: "Find the missing number: 2, 3, 5, 7, _, 13", options: ["9", "11", "10", "12"], correctAnswer: "11", explanation: "Sequence of prime numbers.", difficulty: "Beginner" }
        ]
    },
    'Alphabet Series': {
        explanation: "Alphabet series follow patterns based on the positions of letters (A=1, B=2, etc.) or skipping specific numbers of letters.",
        workedExample: {
            problem: "Next in series: A, C, F, J, ?",
            solution: "A(+2)C, C(+3)F, F(+4)J. Next is J(+5) = O."
        },
        questions: [
            { id: 'as1', questionText: "Next in series: Z, X, V, T, ?", options: ["S", "R", "U", "Q"], correctAnswer: "R", explanation: "Letters are decreasing by 2 positions backwards.", difficulty: "Beginner" }
        ]
    },
    'Coding and Decoding': {
        explanation: "Coding translates words or numbers into a secret format using a specific rule. Decoding is reversing that process.",
        workedExample: {
            problem: "If CAT is DBU, what is DOG?",
            solution: "Rule is +1 (C->D, A->B, T->U). So D+1=E, O+1=P, G+1=H. Answer: EPH."
        },
        questions: [
            { id: 'cd1', questionText: "If HELLO is coded as IFMMP, what is WORLD?", options: ["XPSME", "XPSOE", "XPSED", "VNSKC"], correctAnswer: "XPSME", explanation: "Shift each letter by +1.", difficulty: "Beginner" }
        ]
    },
    'Analogy': {
        explanation: "Analogy involves finding a relationship between two words or numbers and applying that same relationship to another pair.",
        workedExample: {
            problem: "Car : Road :: Ship : ?",
            solution: "Car moves on Road. Ship moves on Water/Sea."
        },
        questions: [
            { id: 'an1', questionText: "Clock : Time :: Thermometer : ?", options: ["Heat", "Radiation", "Temperature", "Energy"], correctAnswer: "Temperature", explanation: "Clock measures time, Thermometer measures temperature.", difficulty: "Beginner" }
        ]
    },
    'Classification': {
        explanation: "Classification (Odd One Out) requires identifying the item that does not share the common characteristic of the other items in the group.",
        workedExample: {
            problem: "Which is different: Rose, Lily, Potato, Jasmine?",
            solution: "Rose, Lily, and Jasmine are flowers. Potato is a tuber/vegetable. \nOdd one: Potato."
        },
        questions: [
            { id: 'cl1', questionText: "Find the odd one out: Apple, Mango, Carrot, Banana", options: ["Apple", "Mango", "Carrot", "Banana"], correctAnswer: "Carrot", explanation: "Carrot is a vegetable/root, others are fruits.", difficulty: "Beginner" }
        ]
    },
    'Direction Sense': {
        explanation: "Direction sense problems involve tracking a person's movement across North, South, East, and West to find final position or distance.",
        workedExample: {
            problem: "A man walks 3km North, then 4km East. How far is he from start?",
            solution: "Forms a right triangle. Distance² = 3² + 4² = 25. Distance = 5km."
        },
        questions: [
            { id: 'ds1', questionText: "A person faces North, turns 90 degrees right, then 180 degrees left. Which way is he facing?", options: ["North", "South", "East", "West"], correctAnswer: "West", explanation: "N -> (90R) East -> (180L) West.", difficulty: "Intermediate" }
        ]
    },
    'Blood Relations': {
        explanation: "Blood relations problems require mapping family trees based on provided descriptions of how people are related.",
        workedExample: {
            problem: "Pointing to a man, X says: 'He is my father's only son'. Who is the man?",
            solution: "Father's only son is X himself (if X is male) or X's brother.",
            solutionNote: "Usually simplified to 'The man is X'."
        },
        questions: [
            { id: 'br1', questionText: "A is B's sister. C is B's mother. D is C's father. How is A related to D?", options: ["Daughter", "Grand-daughter", "Aunt", "Mother"], correctAnswer: "Grand-daughter", explanation: "A is daughter of C, and C is daughter of D.", difficulty: "Intermediate" }
        ]
    },
    'Clock and Calendar': {
        explanation: "Clock problems involve finding angles between hands. Calendar problems involve finding days based on date and 'odd days' logic.",
        workedExample: {
            problem: "What is the angle between hands at 6:00?",
            solution: "At 6:00, hands are opposite. Angle = 180°."
        },
        questions: [
            { id: 'cc1', questionText: "What is the angle between hour and minute hand at 3:00?", options: ["90°", "45°", "180°", "0°"], correctAnswer: "90°", explanation: "Minute is at 12, Hour is at 3. Difference is 3 hours * 30°/hour = 90°.", difficulty: "Beginner" },
            { id: 'cc2', questionText: "If today is Monday, what was the day 63 days ago?", options: ["Monday", "Tuesday", "Sunday", "Saturday"], correctAnswer: "Monday", explanation: "63 is exactly 9 weeks (63/7=9, rem 0). So it remains Monday.", difficulty: "Intermediate" }
        ]
    },
    'Seating Arrangement': {
        explanation: "Seating arrangement involves placing people in specific positions based on clues about who is next to whom, essentially a logic puzzle.",
        workedExample: {
            problem: "A sits next to B. C sits next to B. D is far left. Order?",
            solution: "Order: D, A, B, C (assuming A is on B's left)."
        },
        questions: [
            { id: 'sa1', questionText: "A, B, C, D are in a row. C is between A and D. B is at right end. Who is at left end?", options: ["A", "D", "C", "Cannot tell"], correctAnswer: "A", explanation: "If B is at right, and C is between A and D, flow must be A, C, D, B or D, C, A, B. Since B is at 'right end', A or D could be at left. Typically A is assumed unless more clues given.", difficulty: "Intermediate" }
        ]
    },
    'Syllogism': {
        explanation: "Syllogism involves drawing logical conclusions from two or more 'premises' (statements assumed to be true).",
        workedExample: {
            problem: "Stmt 1: All cats are animals. Stmt 2: All animals have tails. Conclusion?",
            solution: "All cats have tails."
        },
        questions: [
            { id: 'sy1', questionText: "Stmt: All P are Q. Some Q are R. Conclusion: Some P are R. Is this valid?", options: ["Valid", "Invalid", "Partially valid", "None"], correctAnswer: "Invalid", explanation: "P is inside Q, but R only touches Q, not necessarily P.", difficulty: "Advanced" }
        ]
    },
    'Venn Diagrams': {
        explanation: "Venn Diagrams use circles to represent relationships between different groups or sets.",
        workedExample: {
            problem: "Represent 'Doctors' and 'Women'.",
            solution: "Two overlapping circles. The overlap represents 'Women who are Doctors'."
        },
        questions: [
            { id: 'vd1', questionText: "Which diagram represents: Fruits, Apple, Vegetables?", options: ["Two separate circles", "One circle inside another, plus a third separate circle", "Three overlapping circles", "One circle containing two other overlapping circles"], correctAnswer: "One circle inside another, plus a third separate circle", explanation: "Apple is inside Fruits. Vegetables is a separate category.", difficulty: "Intermediate" }
        ]
    },
    'Visual Reasoning': {
        explanation: "Visual Reasoning includes Mirror images, Water images, and Paper folding patterns.",
        workedExample: {
            problem: "Mirror image of 'M'?",
            solution: "M is vertically symmetrical. Its mirror image is still 'M'."
        },
        questions: [
            { id: 'vr1', questionText: "Which letter looks the same in a mirror?", options: ["B", "P", "A", "C"], correctAnswer: "A", explanation: "A has vertical symmetry.", difficulty: "Beginner" }
        ]
    },
};

export default questionBank;
