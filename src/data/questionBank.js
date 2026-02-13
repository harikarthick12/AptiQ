
// Large Static Question Bank for AptiQ
// This replaces the need for AI and ensures high-quality, non-repetitive content.

const questionBank = {
    // APTITUDE SECTION
    'Percentages': {
        explanation: "Percentages represent parts of a whole where the whole is always 100. The word 'percent' comes from 'per centum', meaning 'per hundred'.",
        explanation_tamil: "சதவீதம் என்பது 100-ஐ அடிப்படையாகக் கொண்ட ஒரு கணக்கீட்டு முறையாகும். 'சதவீதம்' என்றால் 'நூற்றுக்கு' என்று பொருள்.",
        explanation_telugu: "శాతం అనేది ప్రతి 100 వంతులలో ఒక భాగాన్ని సూచిస్తుంది. 'శాతం' అంటే 'వందకు' అని అర్థం.",
        workedExample: {
            problem: "If 40% of a number is 80, what is the number?",
            solution: "Let the number be x.\n0.40 * x = 80\nx = 80 / 0.40\nx = 200.\nAnswer is 200."
        },
        questions: [
            { id: 'p1', questionText: "What is 25% of 200?", options: ["40", "50", "60", "75"], correctAnswer: "50", explanation: "25/100 * 200 = 50", difficulty: "Beginner" },
            { id: 'p2', questionText: "Convert 3/4 into percentage.", options: ["60%", "70%", "75%", "80%"], correctAnswer: "75%", explanation: "3/4 * 100 = 75%", difficulty: "Beginner" },
            { id: 'p3', questionText: "A man earns ₹20,000 and spends 30%. How much does he save?", options: ["₹6,000", "₹14,000", "₹12,000", "₹7,000"], correctAnswer: "₹14,000", explanation: "Savings = 70% of 20,000 = 14,000", difficulty: "Beginner" },
            { id: 'p4', questionText: "If a price increases from ₹100 to ₹125, what is the % increase?", options: ["20%", "25%", "30%", "15%"], correctAnswer: "25%", explanation: "(25/100) * 100 = 25%", difficulty: "Beginner" },
            { id: 'p5', questionText: "Find 10% of 10% of 100.", options: ["10", "1", "0.1", "100"], correctAnswer: "1", explanation: "10% of 100 is 10. 10% of 10 is 1.", difficulty: "Beginner" },
            { id: 'p6', questionText: "If 20% of a number is 50, what is 40% of that number?", options: ["80", "100", "120", "150"], correctAnswer: "100", explanation: "40% is double of 20%, so 2 * 50 = 100.", difficulty: "Beginner" },
            { id: 'p7', questionText: "What is 150% of 60?", options: ["80", "90", "100", "120"], correctAnswer: "90", explanation: "1.5 * 60 = 90.", difficulty: "Beginner" },
            { id: 'p8', questionText: "If x is 20% more than y, then y is how much % less than x?", options: ["20%", "16.67%", "25%", "10%"], correctAnswer: "16.67%", explanation: "y = x/1.2. (1 - 1/1.2) * 100 = 16.67%.", difficulty: "Beginner" },
            { id: 'p9', questionText: "Express 0.05 as a percentage.", options: ["0.5%", "5%", "50%", "0.05%"], correctAnswer: "5%", explanation: "0.05 * 100 = 5%.", difficulty: "Beginner" },
            { id: 'p10', questionText: "What is 1/3 as a percentage (approx)?", options: ["30%", "33.33%", "35%", "33%"], correctAnswer: "33.33%", explanation: "1/3 * 100 = 33.33%.", difficulty: "Beginner" },
            { id: 'p11', questionText: "A's salary is 50% more than B's. How much is B's less than A's?", options: ["50%", "33.33%", "25%", "20%"], correctAnswer: "33.33%", explanation: "1 - 1/1.5 = 0.3333.", difficulty: "Beginner" },
            { id: 'p12', questionText: "80% of 50 is same as x% of 80. Find x.", options: ["40", "50", "60", "70"], correctAnswer: "50", explanation: "0.8 * 50 = 40. x/100 * 80 = 40 => x = 50.", difficulty: "Beginner" },
            { id: 'p13', questionText: "What is 0.5% of 2000?", options: ["1", "10", "100", "0.1"], correctAnswer: "10", explanation: "0.005 * 2000 = 10.", difficulty: "Beginner" },
            { id: 'p14', questionText: "If a student gets 40 out of 50, what % is it?", options: ["70%", "80%", "90%", "75%"], correctAnswer: "80%", explanation: "40/50 * 100 = 80%.", difficulty: "Beginner" }
        ]
    },
    'Time & Work': {
        explanation: "Time and Work relates to the rate of work. If a person finishes a job in 'n' days, their one-day work is 1/n.",
        explanation_tamil: "நேரம் மற்றும் வேலை என்பது வேலையின் வேகத்தைப் பற்றியது. ஒருவர் ஒரு வேலையை 'n' நாட்களில் முடித்தால், அவரின் ஒரு நாள் வேலை 1/n ஆகும்.",
        explanation_telugu: "కాలం మరియు పని సమస్యలలో, ఒక వ్యక్తి 'n' రోజులలో ఒక పనిని పూర్తి చేస్తే, ఒక రోజులో చేసే పని 1/n అవుతుంది.",
        workedExample: {
            problem: "A can do a job in 10 days, B can do it in 15 days. How many days if they work together?",
            solution: "A's rate = 1/10\nB's rate = 1/15\nCombined rate = 1/10 + 1/15 = 5/30 = 1/6\nTime taken = 6 days."
        },
        questions: [
            { id: 'tw1', questionText: "X can finish work in 12 days. How much work is done in 3 days?", options: ["1/2", "1/4", "1/3", "1/6"], correctAnswer: "1/4", explanation: "3/12 = 1/4", difficulty: "Beginner" },
            { id: 'tw2', questionText: "P is twice as fast as Q. If Q takes 20 days, how many days for P?", options: ["40", "10", "15", "5"], correctAnswer: "10", explanation: "P is faster, so P takes half the time.", difficulty: "Beginner" },
            { id: 'tw3', questionText: "A, B, C can do work in 2, 3, 6 days. Together?", options: ["1 day", "2 days", "3 days", "0.5 days"], correctAnswer: "1 day", explanation: "1/2+1/3+1/6 = 1. So 1 day.", difficulty: "Beginner" },
            { id: 'tw4', questionText: "Man can do a job in 5 days. With his son, in 3 days. Son alone?", options: ["6.5", "7.5", "8", "9"], correctAnswer: "7.5", explanation: "1/3 - 1/5 = 2/15. Time = 15/2 = 7.5.", difficulty: "Beginner" }
        ]
    },
    'Probability': {
        explanation: "Probability is the ratio of favorable outcomes to the total sample space.",
        workedExample: {
            problem: "Probability of getting a head in one coin toss?",
            solution: "Outcomes = {H, T}. Favorable = {H}. Prob = 1/2."
        },
        questions: [
            { id: 'pb1', questionText: "Probability of getting an even number in a die roll?", options: ["1/4", "1/3", "1/2", "1/6"], correctAnswer: "1/2", explanation: "{2,4,6} are 3 outcomes out of 6. 3/6 = 1/2", difficulty: "Beginner" },
            { id: 'pb2', questionText: "Cards: Prob of drawing an Ace from a pack of 52?", options: ["1/13", "1/52", "1/4", "4/13"], correctAnswer: "1/13", explanation: "4 Aces in 52 cards. 4/52 = 1/13.", difficulty: "Beginner" },
            { id: 'pb3', questionText: "Two coins tossed. Prob of at least one head?", options: ["1/4", "1/2", "3/4", "1"], correctAnswer: "3/4", explanation: "{HH, HT, TH, TT}. Favorable = 3. 3/4.", difficulty: "Beginner" }
        ]
    },

    // TECHNICAL SECTION
    'OOPS': {
        explanation: "Object-Oriented Programming uses 'objects' to represent data and methods. Core pillars: Encapsulation, Abstraction, Inheritance, Polymorphism.",
        workedExample: {
            problem: "Give an example of Inheritance.",
            solution: "A 'Car' class inheriting properties from a 'Vehicle' class."
        },
        questions: [
            { id: 'oo1', questionText: "Which concept allows using a child class object where a parent is expected?", options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"], correctAnswer: "Polymorphism", explanation: "Specifically subtype polymorphism.", difficulty: "Beginner" },
            { id: 'oo2', questionText: "What is an instance of a class called?", options: ["Interface", "Object", "Method", "Variable"], correctAnswer: "Object", explanation: "Objects are instances of classes.", difficulty: "Beginner" },
            { id: 'oo3', questionText: "Which keyword is used for inheritance in Java?", options: ["implements", "inherits", "extends", "module"], correctAnswer: "extends", explanation: "Class A extends B.", difficulty: "Beginner" }
        ]
    },
    'Arrays': {
        explanation: "Arrays are contiguous memory locations to store similar types of data.",
        questions: [
            { id: 'ar1', questionText: "Access time for an array element by index is?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correctAnswer: "O(1)", explanation: "Direct indexing is constant time.", difficulty: "Beginner" },
            { id: 'ar2', questionText: "Base address of array is address of first element?", options: ["True", "False"], correctAnswer: "True", explanation: "Standard definition.", difficulty: "Beginner" }
        ]
    },
    'Data Structures': {
        explanation: "Methods of organizing data in computers to use efficiently.",
        questions: [
            { id: 'ds1', questionText: "Which DS uses LIFO?", options: ["Queue", "Stack", "Tree", "Linked List"], correctAnswer: "Stack", explanation: "Last In First Out.", difficulty: "Beginner" },
            { id: 'ds2', questionText: "Which DS uses FIFO?", options: ["Queue", "Stack", "Tree", "Graph"], correctAnswer: "Queue", explanation: "First In First Out.", difficulty: "Beginner" }
        ]
    },

    // LOGICAL SECTION - NOW FIXED
    'Reasoning basics': {
        explanation: "Reasoning basics involve identifying patterns, relationships, and logical sequences.",
        explanation_tamil: "அடிப்படை பகுத்தறிவு என்பது வடிவங்கள் மற்றும் தொடர்புகளைக் கண்டறிவதாகும்.",
        workedExample: {
            problem: "If CAT is 3120, what is DOG?",
            solution: "C=3, A=1, T=20. So D=4, O=15, G=7. Answer: 4157."
        },
        questions: [
            { id: 'rb1', questionText: "If Apple is fruit, what is Carrot?", options: ["Fruit", "Vegetable", "Grain", "Meat"], correctAnswer: "Vegetable", explanation: "Carrot is a root vegetable.", difficulty: "Beginner" },
            { id: 'rb2', questionText: "Find the odd one out: 2, 4, 8, 10, 16", options: ["2", "8", "10", "16"], correctAnswer: "10", explanation: "All others are powers of 2 (2^1, 2^2, 2^3, 2^4).", difficulty: "Beginner" },
            { id: 'rb3', questionText: "Brother is to Sister as Son is to?", options: ["Mother", "Daughter", "Aunt", "Niece"], correctAnswer: "Daughter", explanation: "Opposite gender in same relation level.", difficulty: "Beginner" },
            { id: 'rb4', questionText: "Which word does not belong with the others?", options: ["Leopard", "Cougar", "Tiger", "Wolf"], correctAnswer: "Wolf", explanation: "Others are members of the cat family.", difficulty: "Beginner" },
            { id: 'rb5', questionText: "Odometer is to mileage as compass is to?", options: ["Speed", "Hiking", "Direction", "Needle"], correctAnswer: "Direction", explanation: "Compass measures direction.", difficulty: "Beginner" },
            { id: 'rb6', questionText: "Marathon is to race as hibernation is to?", options: ["Winter", "Bear", "Sleep", "Dream"], correctAnswer: "Sleep", explanation: "Hibernation is a long sleep.", difficulty: "Beginner" },
            { id: 'rb7', questionText: "Window is to pane as book is to?", options: ["Novel", "Glass", "Cover", "Page"], correctAnswer: "Page", explanation: "Pane is a part of window, Page is a part of book.", difficulty: "Beginner" },
            { id: 'rb8', questionText: "Yard is to inch as quart is to?", options: ["Gallon", "Ounce", "Milk", "Liquid"], correctAnswer: "Ounce", explanation: "Comparison of units.", difficulty: "Beginner" },
            { id: 'rb9', questionText: "Find the odd one out: Circle, Square, Triangle, Cube", options: ["Circle", "Square", "Triangle", "Cube"], correctAnswer: "Cube", explanation: "Others are 2D, Cube is 3D.", difficulty: "Beginner" },
            { id: 'rb10', questionText: "Pen is to Write as Knife is to?", options: ["Vegetable", "Cut", "Sharp", "Handle"], correctAnswer: "Cut", explanation: "Pen's function is to write, Knife's function is to cut.", difficulty: "Beginner" },
            { id: 'rb11', questionText: "Which direction is opposite to South-East?", options: ["North-West", "North-East", "South-West", "North"], correctAnswer: "North-West", explanation: "Opposite of South is North, East is West.", difficulty: "Beginner" },
            { id: 'rb12', questionText: "If yesterday was Tuesday, what day will it be tomorrow?", options: ["Wednesday", "Thursday", "Friday", "Monday"], correctAnswer: "Thursday", explanation: "Yesterday=Tue, Today=Wed, Tomorrow=Thu.", difficulty: "Beginner" },
            { id: 'rb13', questionText: "Pointing to a man, a girl said, 'He is the son of my grandfather's only child'. How is the man related to the girl?", options: ["Father", "Brother", "Cousin", "Uncle"], correctAnswer: "Brother", explanation: "Grandfather's only child is the father. Father's son is the brother.", difficulty: "Beginner" }
        ]
    },
    'Puzzles': {
        explanation: "Puzzles require out-of-the-box thinking and critical analysis of given clues.",
        workedExample: {
            problem: "A father has 4 daughters, and each daughter has a brother. How many children total?",
            solution: "5. All daughters share the same one brother."
        },
        questions: [
            { id: 'pz1', questionText: "A is the father of B, but B is not the son of A. What is B?", options: ["Brother", "Daughter", "Uncle", "Grandson"], correctAnswer: "Daughter", explanation: "If not a son, B must be a daughter.", difficulty: "Beginner" },
            { id: 'pz2', questionText: "What comes once in a minute, twice in a moment, but never in a thousand years?", options: ["The letter M", "The letter T", "A second", "Light"], correctAnswer: "The letter M", explanation: "m-inute, mo-m-ent.", difficulty: "Beginner" },
            { id: 'pz3', questionText: "If you have three apples and you take away two, how many apples do you have?", options: ["1", "2", "3", "0"], correctAnswer: "2", explanation: "You took two, so you HAVE those two.", difficulty: "Beginner" },
            { id: 'pz4', questionText: "What has keys but can't open locks?", options: ["A Map", "A Piano", "A Prison", "A Box"], correctAnswer: "A Piano", explanation: "Musical keys.", difficulty: "Beginner" },
            { id: 'pz5', questionText: "A man is pushing his car. He stops at a hotel and at that moment he knows he is bankrupt. Why?", options: ["He's playing Monopoly", "He's tired", "He crashed", "He's hungry"], correctAnswer: "He's playing Monopoly", explanation: "Classic riddle context.", difficulty: "Beginner" },
            { id: 'pz6', questionText: "What has a heart that doesn't beat?", options: ["An Artichoke", "A Robot", "A Statue", "A Ghost"], correctAnswer: "An Artichoke", explanation: "Vegetables have hearts.", difficulty: "Beginner" },
            { id: 'pz7', questionText: "If 5 cats catch 5 mice in 5 minutes, how long will it take 1 cat to catch 1 mouse?", options: ["1 minute", "5 minutes", "25 minutes", "10 minutes"], correctAnswer: "5 minutes", explanation: "Rate is the same.", difficulty: "Beginner" },
            { id: 'pz8', questionText: "Which month has 28 days?", options: ["February", "March", "All of them", "August"], correctAnswer: "All of them", explanation: "Every month has at least 28 days.", difficulty: "Beginner" },
            { id: 'pz9', questionText: "What is full of holes but still holds water?", options: ["A Sponge", "A Sieve", "A Cup", "A Net"], correctAnswer: "A Sponge", explanation: "Sponge properties.", difficulty: "Beginner" },
            { id: 'pz10', questionText: "If you're running a race and you pass the person in second place, what place are you in?", options: ["First", "Second", "Third", "Last"], correctAnswer: "Second", explanation: "You took their spot in second.", difficulty: "Beginner" },
            { id: 'pz11', questionText: "What is as light as a feather, but even the world's strongest man couldn't hold it for long?", options: ["His breath", "A balloon", "A secret", "Air"], correctAnswer: "His breath", explanation: "Breath holding.", difficulty: "Beginner" },
            { id: 'pz12', questionText: "What belongs to you, but others use it more than you do?", options: ["Your name", "Your money", "Your phone", "Your car"], correctAnswer: "Your name", explanation: "Others call you by name.", difficulty: "Beginner" },
            { id: 'pz13', questionText: "What gets wetter the more it dries?", options: ["A towel", "A cloud", "Rain", "A sponge"], correctAnswer: "A towel", explanation: "Towel absorbs water to dry things.", difficulty: "Beginner" },
            { id: 'pz14', questionText: "What can you catch, but not throw?", options: ["A cold", "A ball", "A secret", "A bus"], correctAnswer: "A cold", explanation: "Idiomatic expression.", difficulty: "Beginner" },
            { id: 'pz15', questionText: "Poor people have it. Rich people need it. If you eat it you die. What is it?", options: ["Nothing", "Love", "Money", "Bread"], correctAnswer: "Nothing", explanation: "Nothing is what poor have, rich need nothing, eating nothing kills.", difficulty: "Beginner" },
            { id: 'pz16', questionText: "Forward I am heavy, but backward I am not. What am I?", options: ["Ton", "Lead", "Car", "Word"], correctAnswer: "Ton", explanation: "Ton spelled backward is Not.", difficulty: "Beginner" },
            { id: 'pz17', questionText: "What has many teeth, but cannot bite?", options: ["A Comb", "A Saw", "A Zipper", "A Gear"], correctAnswer: "A Comb", explanation: "Combs have teeth for hair.", difficulty: "Beginner" },
            { id: 'pz18', questionText: "I am tall when I am young, and I am short when I am old. What am I?", options: ["A Candle", "A Tree", "A Person", "A Pencil"], correctAnswer: "A Candle", explanation: "Candles melt as they burn.", difficulty: "Beginner" },
            { id: 'pz19', questionText: "What has to be broken before you can use it?", options: ["An Egg", "A Promise", "A Record", "A Lock"], correctAnswer: "An Egg", explanation: "You break an egg to cook it.", difficulty: "Beginner" },
            { id: 'pz20', questionText: "I'm found in socks, scarves and mittens; and often in the paws of playful kittens. What am I?", options: ["Yarn", "Milk", "Cotton", "Air"], correctAnswer: "Yarn", explanation: "Kittens love yarn.", difficulty: "Beginner" },
            { id: 'pz21', questionText: "Where can you find cities, towns, shops, and streets but no people?", options: ["A Map", "A Desert", "A Movie", "A Cemetery"], correctAnswer: "A Map", explanation: "Maps represent places without people.", difficulty: "Beginner" },
            { id: 'pz22', questionText: "What word is spelled incorrectly in every dictionary?", options: ["Incorrectly", "Wait", "Dictionary", "Spelled"], correctAnswer: "Incorrectly", explanation: "The word 'incorrectly' is actually correctly spelled as 'incorrectly'.", difficulty: "Beginner" },
            { id: 'pz23', questionText: "What can't talk but will reply when spoken to?", options: ["An Echo", "A Radio", "A Mirror", "A Phone"], correctAnswer: "An Echo", explanation: "Echoes repeat what is said.", difficulty: "Beginner" },
            { id: 'pz24', questionText: "The more of this there is, the less you see. What is it?", options: ["Darkness", "Light", "Dust", "Smoke"], correctAnswer: "Darkness", explanation: "Darkness obscures vision.", difficulty: "Beginner" },
            { id: 'pz25', questionText: "What case can't be opened with any key?", options: ["A Staircase", "A Suitcase", "A Briefcase", "A Bookcase"], correctAnswer: "A Staircase", explanation: "It's not a physical case.", difficulty: "Beginner" }
        ]
    },
    'Series': {
        explanation: "Series are sequences of numbers or letters following a specific mathematical or alphabetical rule.",
        workedExample: {
            problem: "What is next: 2, 4, 6, 8, ...?",
            solution: "Rule is +2. Next is 10."
        },
        questions: [
            { id: 'sr1', questionText: "Complete: 1, 4, 9, 16, ?", options: ["20", "24", "25", "30"], correctAnswer: "25", explanation: "Squares: 1^2, 2^2, 3^2, 4^2, 5^2.", difficulty: "Beginner" },
            { id: 'sr2', questionText: "Complete: 2, 3, 5, 7, 11, ?", options: ["12", "13", "14", "15"], correctAnswer: "13", explanation: "Prime numbers sequence.", difficulty: "Beginner" },
            { id: 'sr3', questionText: "Complete: A, C, E, G, ?", options: ["H", "I", "J", "K"], correctAnswer: "I", explanation: "Skip one letter: A (B) C (D) E (F) G (H) I.", difficulty: "Beginner" },
            { id: 'sr4', questionText: "Complete: 10, 20, 31, 43, ?", options: ["55", "56", "57", "58"], correctAnswer: "56", explanation: "Differences are +10, +11, +12, next is +13. 43+13=56.", difficulty: "Beginner" },
            { id: 'sr5', questionText: "Complete: 5, 25, 125, ?", options: ["500", "600", "625", "725"], correctAnswer: "625", explanation: "Powers of 5.", difficulty: "Beginner" },
            { id: 'sr6', questionText: "Complete: 100, 90, 81, 73, ?", options: ["65", "66", "64", "67"], correctAnswer: "66", explanation: "-10, -9, -8, so next is -7. 73-7=66.", difficulty: "Beginner" },
            { id: 'sr7', questionText: "Complete: 7, 10, 8, 11, 9, 12, ?", options: ["7", "10", "12", "13"], correctAnswer: "10", explanation: "Pattern: +3, -2, +3, -2...", difficulty: "Beginner" },
            { id: 'sr8', questionText: "Complete: 1, 1, 2, 3, 5, 8, ?", options: ["10", "11", "12", "13"], correctAnswer: "13", explanation: "Fibonacci sequence: Each is sum of previous two.", difficulty: "Beginner" },
            { id: 'sr9', questionText: "Complete: 0, 7, 26, 63, ?", options: ["124", "125", "126", "100"], correctAnswer: "124", explanation: "n^3 - 1 sequence.", difficulty: "Beginner" },
            { id: 'sr10', questionText: "Complete: 1, 2, 6, 24, 120, ?", options: ["600", "720", "840", "1000"], correctAnswer: "720", explanation: "Factorial sequence: 1!, 2!, 3!, 4!, 5!, 6!.", difficulty: "Beginner" },
            { id: 'sr11', questionText: "Complete: 3, 12, 48, 192, ?", options: ["768", "256", "512", "1024"], correctAnswer: "768", explanation: "Geometric progression: multiply by 4.", difficulty: "Beginner" },
            { id: 'sr12', questionText: "Complete: 2, 5, 10, 17, ?", options: ["24", "25", "26", "27"], correctAnswer: "26", explanation: "n^2 + 1 sequence.", difficulty: "Beginner" },
            { id: 'sr13', questionText: "Complete: 36, 34, 30, 28, 24, ?", options: ["20", "22", "23", "26"], correctAnswer: "22", explanation: "-2, -4, -2, -4 pattern.", difficulty: "Beginner" },
            { id: 'sr14', questionText: "Complete: 8, 6, 9, 23, 87, ?", options: ["429", "450", "435", "500"], correctAnswer: "429", explanation: "x1-2, x2-3, x3-4, x4-5, so 87x5-6 = 429.", difficulty: "Beginner" },
            { id: 'sr15', questionText: "Complete: 2, 3, 6, 15, 45, ?", options: ["112.5", "157.5", "135", "90"], correctAnswer: "157.5", explanation: "x1.5, x2, x2.5, x3, x3.5 pattern.", difficulty: "Beginner" },
            { id: 'sr16', questionText: "Complete: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], correctAnswer: "42", explanation: "Adding +4, +6, +8, +10, +12. 30+12=42.", difficulty: "Beginner" },
            { id: 'sr17', questionText: "Complete: 1, 8, 27, 64, ?", options: ["100", "121", "125", "144"], correctAnswer: "125", explanation: "Cubes: 1^3, 2^3, 3^3, 4^3, 5^3.", difficulty: "Beginner" },
            { id: 'sr18', questionText: "Complete: 4, 9, 25, 49, 121, ?", options: ["144", "169", "196", "225"], correctAnswer: "169", explanation: "Squares of prime numbers: 2^2, 3^2, 5^2, 7^2, 11^2, 13^2.", difficulty: "Beginner" },
            { id: 'sr19', questionText: "Complete: 5, 11, 23, 47, ?", options: ["94", "95", "96", "97"], correctAnswer: "95", explanation: "x2 + 1 rule.", difficulty: "Beginner" },
            { id: 'sr20', questionText: "Complete: 120, 99, 80, 63, 48, ?", options: ["35", "38", "39", "40"], correctAnswer: "35", explanation: "n^2 - 1 for n=11, 10, 9, 8, 7, 6. 6^2-1=35.", difficulty: "Beginner" },
            { id: 'sr21', questionText: "Complete: 2, 15, 41, 80, ?", options: ["111", "120", "121", "132"], correctAnswer: "132", explanation: "Differences are 13, 26, 39, next is 52. 80+52=132.", difficulty: "Beginner" },
            { id: 'sr22', questionText: "Complete: 6, 13, 25, 51, 101, ?", options: ["201", "202", "203", "205"], correctAnswer: "203", explanation: "x2+1, x2-1, x2+1, x2-1, x2+1 pattern. 101x2+1=203.", difficulty: "Beginner" },
            { id: 'sr23', questionText: "Complete: 11, 13, 17, 19, 23, 25, ?", options: ["27", "29", "31", "33"], correctAnswer: "29", explanation: "+2, +4, +2, +4, +2, +4 pattern.", difficulty: "Beginner" },
            { id: 'sr24', questionText: "Complete: 1, 2, 5, 10, 17, 26, ?", options: ["35", "37", "39", "41"], correctAnswer: "37", explanation: "n^2 + 1 sequence.", difficulty: "Beginner" },
            { id: 'sr25', questionText: "Complete: 4, 7, 12, 19, 28, ?", options: ["39", "30", "35", "40"], correctAnswer: "39", explanation: "+3, +5, +7, +9, +11 pattern.", difficulty: "Beginner" }
        ]
    }
};

module.exports = questionBank;
