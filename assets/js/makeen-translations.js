// Comprehensive translation system with RTL support
(function () {
  const translations = {
    ar: {
      // Navigation
      "nav-home": "الرئيسية",
      "nav-who": "من نحن",
      "nav-programs": "البرامج",
      "nav-contact": "اتصل بنا",
      
      // Login
      "login-btn": "تسجيل الدخول",
      
      // Hero Section
      "hero-title": "رحلة تعلم أفضل ومستقبل يبدأ الآن.",
      "hero-desc": "ابدأ رحلتك نحو مستقبل أكثر إشراقًا مع منصتنا. نحن نمكنك من المهارات والمعرفة الأساسية للنجاح في عالم متغير. اكتشف مسارات تعليمية مبتكرة تثري حياتك وتفتح آفاقًا جديدة.",
      "hero-btn1": "ابدأ الآن",
      "hero-btn2": "ابحث عن برنامج",
      
      // Services Section
      "service-exclusive-trainer": "مدرب حصري",
      "service-exclusive-desc": "انضم إلى برنامج المدرب الحصري للحصول على إرشادات شخصية ورؤى الخبراء المصممة خصيصًا لتعلمك.",
      "service-creative-minds": "عقول مبدعة",
      "service-creative-desc": "أطلق العنان لإبداعك بأفكار واستراتيجيات مبتكرة تلهم التفكير الأصيل.",
      "service-visual-lessons": "دروس بصرية",
      "service-visual-desc": "تفاعل مع دروس بصرية تفاعلية مصممة لتعزيز فهمك للموضوعات المعقدة.",
      "service-world-numbers": "أرقام العالم",
      "service-world-desc": "استكشف عالم المفاهيم الرقمية الرائع وتطبيقاتها في الحياة اليومية.",
      "service-read-more": "اقرأ المزيد",
      
      // About Section
      "about-tagline": "من نحن",
      "about-title": "إنشاء مجتمع تعلم مدى الحياة",
      "about-flexible-title": "فصول مرنة",
      "about-flexible-desc": "جلسات تعلم مرنة وقابلة للتخصيص مصممة لتلبية الاحتياجات الفردية.",
      "about-live-title": "فصول مباشرة من أي مكان",
      "about-live-desc": "فصول تفاعلية وجذابة يمكن الوصول إليها من أي مكان، مما يضمن الراحة وإمكانية الوصول لجميع المتعلمين.",
      "about-discover-btn": "اكتشف المزيد",
      "about-need-details": "هل تحتاج لمعرفة المزيد من التفاصيل؟",
      
      // Category Section
      "category-tagline": "الفئة",
      "category-title": "المواضيع المفضلة للتعلم",
      "category-project-management": "إدارة المشاريع",
      "category-project-desc": "دورات متخصصة",
      "category-business-development": "تطوير الأعمال",
      "category-business-desc": "دورات تعليمية",
      "category-data-analysis": "تحليل البيانات",
      "category-data-desc": "دورات تدريبية",
      "category-business-strategies": "استراتيجيات الأعمال",
      "category-strategies-desc": "ورش عمل",
      
      // Programs Section
      "programs-tagline": "برامج مكين",
      "programs-title": "استكشف مجموعة واسعة من البرامج",
      "program-title-1": "أساسيات Python",
      "program-desc-1": "تعلم Python من البداية مع أمثلة عملية ومشاريع",
      "program-title-2": "دليل Vue.js 3 الشامل",
      "program-desc-2": "إتقان Vue.js 3 مع Composition API و Vuex و Vue Router لتطبيقات الويب الحديثة",
      "program-title-3": "Docker و Kubernetes",
      "program-desc-3": "تعلم الحاويات والتنسيق لنشر التطبيقات الحديثة",
      "program-title-4": "ممارس سحابة AWS",
      "program-desc-4": "احصل على شهادة في أساسيات AWS وتعلم أساسيات الحوسبة السحابية",
      "program-title-5": "أساسيات علم البيانات",
      "program-desc-5": "تعلم تحليل البيانات والتصور وأساسيات التعلم الآلي مع Python",
      "program-title-6": "مبادئ تصميم UI/UX",
      "program-desc-6": "إتقان أساسيات تصميم واجهة المستخدم وتجربة المستخدم للمنتجات الرقمية",
      "badge-open": "التسجيل مفتوح",
      "view-details": "عرض التفاصيل",
      "view-all": "عرض جميع البرامج ←",
      
      // Counter Section
      "counter-title": "احصل على تعويض",
      "counter-desc": "يمنحك تعويضًا لأن النص المُولد لـ Ipsum يكون دائمًا خاليًا من التكرار أو الدعابة المحقونة أو الكلمات غير المميزة.",
      "counter-join": "انضم الآن",
      "counter-register": "سجل الآن واحصل على",
      "counter-get": "احصل على",
      "counter-compensation": "تعويض",
      
      // Testimonial Section
      "testimonial-tagline": "آراء العملاء",
      "testimonial-title": "ما يقوله طلابنا",
      "testimonial-quote-1": "الفصول المرنة تشير إلى عملية اكتساب المعرفة أو المهارات من خلال استخدام التقنيات الرقمية والإنترنت. الفصول المرنة تشير إلى العملية المرنة للتعلم الفعال.",
      "testimonial-name-1": "سافانا نجوين",
      "testimonial-role-1": "مصممة واجهة المستخدم/تجربة المستخدم",
      "testimonial-quote-2": "الفصول المرنة تشير إلى عملية اكتساب المعرفة أو المهارات من خلال استخدام التقنيات الرقمية والإنترنت. الفصول المرنة تشير إلى العملية المرنة للتعلم التفاعلي.",
      "testimonial-name-2": "كريستين إيف",
      "testimonial-role-2": "مطورة ويب",
      "testimonial-quote-3": "الفصول المرنة تشير إلى عملية اكتساب المعرفة أو المهارات من خلال استخدام التقنيات الرقمية والإنترنت. الفصول المرنة تشير إلى العملية المرنة للتعلم المتقدم.",
      "testimonial-name-3": "سارة تايلور",
      "testimonial-role-3": "خبيرة تحسين محركات البحث",
      
      // CTA Section
      "cta-title": "شهادة مهارات من مكين",
      "cta-btn": "ابدأ الآن",
      
      // Footer
      "footer-about": "هي حقيقة ثابتة منذ زمن طويل أن القارئ سينشغل بالمحتوى المقروء للصفحة عند النظر في تخطيطها.",
      "footer-contact": "اتصل بنا",
      "footer-email": "joinmakeen@mtcit.gov.om",
      "footer-website": "www.mtcit.gov.om",
      "footer-copyright": "حقوق الطبع والنشر © <span class='dynamic-year'></span> جميع الحقوق محفوظة، وزارة النقل والاتصالات وتقنية المعلومات، تحت إدارة (GLOBCOM)",
      
      // Meta Information
      "duration-1-5": "1.5 شهر",
      "duration-2": "2 شهر",
      "duration-3": "3 شهر",
      "duration-2-5": "2.5 شهر",
      "language-both": "إنجليزي/عربي",
      "delivery-online": "عبر الإنترنت",
      "location-muscat": "مسقط",
      
      // Programs Catalog Page
      "programs-badge": "برامج مكين",
      "programs-page-title": "كتالوج البرامج",
      "programs-page-subtitle": "استكشف وقدم للبرامج التدريبية في مكين المركزة على البحث والتعليم والابتكار من خلال منصتنا الرقمية سهلة الاستخدام",
      "search-placeholder": "البحث عن البرنامج بالاسم...",
      "filter-all": "جميع البرامج",
      "filter-programming": "البرمجة",
      "filter-design": "التصميم",
      "filter-data": "علم البيانات",
      "filter-cloud": "الحوسبة السحابية",
      "no-results": "لم يتم العثور على برامج تطابق بحثك",
      "try-different": "جرب كلمات مفتاحية مختلفة أو تصفح جميع البرامج المتاحة",
      
      // No Results Messages
      "no-results-title": "لم يتم العثور على نتيجة",
      "no-results-text": "عفوا... لم يتم العثور على نتيجة البحث، يرجى المحاولة بكلمات مفتاحية مختلفة",
      
      // Program Details Page
      "program-details-desc": "انغمس في عالم البرمجة مع دورة 'أساسيات Python' الخاصة بنا! تم تصميم هذا البرنامج للمبتدئين ويغطي المفاهيم الأساسية لـ Python، بما في ذلك أنواع البيانات وهياكل التحكم والدوال والمكتبات. ستشارك في مشاريع عملية تعزز تعلمك وتساعدك في بناء أساس قوي في البرمجة. بحلول نهاية الدورة، ستكون مجهزًا بالمهارات اللازمة لمعالجة تحديات البرمجة الحقيقية وإنشاء تطبيقاتك الخاصة.",
      "duration-label": "المدة:",
      "duration-3-months": "3 شهور",
      "language-label": "اللغة:",
      "language-en-ar": "إنجليزي وعربي",
      "mode-label": "الطريقة:",
      "mode-onsite": "حضوري",
      "location-label": "الموقع:",
      "location-detail": "مول الأريمي بوليفارد، الخوض، مسقط",
      "registration-dates": "يبدأ التسجيل من 30 يونيو حتى 19 أغسطس 2025",
      "enroll-now": "سجل الآن",
      "duration-detail": "3 شهور",
      "language-detail": "إنجليزي وعربي",
      "mode-detail": "حضوري",
      
      // Navigation
      "nav-introduction": "مقدمة",
      "nav-objectives": "الأهداف",
      "nav-requirements": "متطلبات التسجيل",
      "nav-attachments": "المرفقات المطلوبة",
      "nav-partners": "شركاؤنا",
      "nav-faqs": "الأسئلة الشائعة",
      
      // Content Sections
      "section-introduction": "مقدمة",
      "introduction-content": "تلتزم شركة كود أكاديمي بتعزيز النمو المهني من خلال مجموعة من برامج الشهادات المتخصصة المصممة لتلبية الاحتياجات المتطورة للصناعة. تهدف مبادرتنا، المدعومة بفخر من وزارة النقل والاتصالات وتقنية المعلومات، إلى تخفيف العبء المالي على المستفيدين من خلال تسديد التكاليف المتكبدة أثناء امتحانات الشهادات. لا يهدف هذا البرنامج الشامل إلى تحفيز المهنيين الوطنيين ورجال الأعمال والباحثين عن عمل فحسب، بل يسعى أيضًا إلى تمكينهم بمهارات ومعرفة متقدمة. من خلال تزويد الأفراد بهذه المؤهلات الأساسية، نسعى لتعزيز خبراتهم في المجالات المتخصصة التي تحظى بطلب متزايد في سوق العمل التنافسي اليوم، مما يساهم في النهاية في قوة عمل أكثر مهارة.",
      
      "section-objectives": "الأهداف",
      "objective-1": "تعزيز النمو المهني من خلال برامج الشهادات المتخصصة.",
      "objective-2": "تخصيص البرامج لتلبية الاحتياجات المتطورة للصناعة.",
      "objective-3": "تخفيف الأعباء المالية من خلال تسديد تكاليف امتحانات الشهادات.",
      "objective-4": "تحفيز المهنيين الوطنيين ورجال الأعمال والباحثين عن عمل للحصول على شهادات معتمدة.",
      "objective-5": "تمكين الأفراد بمهارات ومعرفة متقدمة في الاتصالات وتقنية المعلومات.",
      "objective-6": "تعزيز الخبرة في المجالات المتخصصة المطلوبة في سوق العمل التنافسي.",
      "objective-7": "المساهمة في قوة عمل أكثر مهارة.",
      
      "section-requirements": "متطلبات التسجيل",
      "requirement-1": "يجب أن يكون المرشح من الجنسية العمانية.",
      "requirement-2": "يجب أن يكون المرشح باحثًا عن عمل.",
      "requirement-3": "يجب أن يتخصص المرشح في علوم الحاسوب والهندسة ونظم المعلومات والتقنية.",
      "requirement-4": "يجب أن يكون المرشح مهتمًا بتقنيات تطوير تطبيقات الويب الشاملة.",
      "requirement-5": "يجب على المشارك الالتزام بإكمال البرنامج في الإطار الزمني المحدد.",
      
      "section-attachments": "المرفقات المطلوبة",
      "attachment-1": "شهادة البكالوريوس",
      "attachment-2": "شهادة الباحث عن عمل",
      "attachment-3": "السيرة الذاتية",
      
      "section-partners": "شركاؤنا",
      
      "section-faqs": "الأسئلة الشائعة",
      "faq-q1": "ما هي المفاهيم الأساسية التي تغطيها دورة Python للمبتدئين في الأعمال؟",
      "faq-a1": "تشمل المفاهيم الأساسية في دورة Python للمبتدئين في الأعمال أنواع البيانات وهياكل التحكم والدوال والمكتبات وتصور البيانات.",
      "faq-q2": "ما هي المبادئ الأساسية للإدارة التي يمكن تطبيقها باستخدام Python؟",
      "faq-a2": "يمكن تطبيق Python على مبادئ الإدارة من خلال تحليل البيانات وأتمتة المهام المتكررة وإنشاء لوحات معلومات لصنع القرار.",
      "faq-q3": "ما هي استراتيجيات التسويق القائمة على Python التي يمكن للشركات تنفيذها بفعالية؟",
      "faq-a3": "يمكن للشركات استخدام Python لتجميع العملاء وتحليل المشاعر واستخراج البيانات من الويب لأبحاث السوق وحملات التسويق الإلكتروني المؤتمتة.",
      "faq-q4": "كيف يلعب Python دورًا في المحاسبة المالية ولماذا هو مهم للشركات؟",
      "faq-a4": "يساعد Python في المحاسبة المالية من خلال الحسابات الآلية وإنشاء التقارير المالية والتحقق من صحة البيانات وإنشاء النماذج المالية للتنبؤ.",
      "faq-q5": "بأي طرق يمكن لـ Python تعزيز فهم السلوك التنظيمي في الشركة؟",
      "faq-a5": "يمكن لـ Python تحليل بيانات الموظفين وردود الاستطلاع وأنماط التواصل لتقديم رؤى حول السلوك التنظيمي وديناميكيات الفريق.",
      "faq-q6": "كيف يمكن استخدام Python لاستكشاف أخلاقيات الأعمال والمسؤولية الاجتماعية للشركات؟",
      "faq-a6": "يمكن استخدام Python لتحليل مقاييس الاستدامة وتتبع مبادرات المسؤولية الاجتماعية للشركات وإنشاء تقارير حول الممارسات التجارية الأخلاقية وتأثيرها.",
      
      // Start Application Page
      "welcome-dear-name": "عبد الرحمن العزيز،",
      "welcome-message-content": "أهلاً وسهلاً بك! بينما نبدأ هذه الرحلة معاً، أود أن نبدأ بمرحلة الاستبيان ثم المرفقات. هذه الخطوة المحورية تُمثل أساساً لفهم احتياجاتك وتفضيلاتك وأهدافك، مما يُمكننا من تخصيص منهجنا وفقاً لذلك.<br /><br />مساهمتك في هذه المرحلة لا تُقدر بثمن حيث تُرسي الأساس لتعاونِنا المستقبلي. من خلال تقديم ردود شاملة وصادقة، تُمكننا من مواءمة استراتيجياتنا ومواردنا مع رؤيتك وطموحاتك الفريدة.<br /><br />كن مطمئناً، أن خصوصيتك وسريتك هي من أهم أولوياتنا. أي معلومات تُتم مشاركتها خلال هذه العملية ستُعامل بأقصى درجات العناية والكتمان.<br /><br />شكراً لك مُسبقاً على تعاونك ومشاركتك. دعنا نُبحر معاً في هذه الرحلة ونُمهد الطريق للنجاح!",
      "consent-text": "أؤكد بهذا أن المعلومات التي أقدمها صحيحة حسب علمي",
      "start-btn": "ابدأ",

      "wizard.q1.progress": "السؤال 1/3",
      "wizard.q1.title": "لماذا اخترت هذا البرنامج؟",
      "wizard.q1.option1": "للحصول على المعرفة والتطوير",
      "wizard.q1.option2": "للمتعة",
      "wizard.q1.option3": "لتعلم مهارات جديدة",
      "wizard.q1.option4": "جميع ما سبق",

      "wizard.q2.progress": "السؤال 2/3",
      "wizard.q2.title": "ما هي العوامل التي أثرت على قرارك لاختيار هذا البرنامج؟",
      "wizard.q2.option1": "جذاب",
      "wizard.q2.option2": "التعلم الذاتي",
      "wizard.q2.option3": "تقنية جديدة",
      "wizard.q2.option4": "قريب من موقعك",

      "wizard.q3.progress": "السؤال 3/3",
      "wizard.q3.title": "هل يمكنك تقديم ملخص موجز للأسباب التي دفعتك لاختيار هذا البرنامج؟",
      "wizard.q3.placeholder": "اكتب إجابتك هنا...",

      "wizard.attachments.title": "تحميل المستندات المطلوبة",
      "wizard.attachments.national_id": "البطاقة الشخصية",
      "wizard.attachments.cv": "السيرة الذاتية",
      "wizard.attachments.qualification": "المؤهل العلمي",
      "wizard.attachments.experience": "الخبرة",

      "wizard.exit": "خروج",
      "wizard.next": "التالي",
      "wizard.back": "السابق",
      "wizard.submit": "إرسال الطلب",
      "wizard.dashboard": "العودة إلى لوحة التحكم",

      "wizard.thankyou.title": "شكرًا لوقتك وإجاباتك",
      "wizard.thankyou.sub": "<strong>عزيزي عبد الرحمن،</strong><br><br>شكرًا لك على تخصيص الوقت لتزويدنا بإجاباتك ورؤاك القيمة.<br>تم حفظ إجاباتك والمرفقات الخاصة بك وتم استلام طلبك للالتحاق، وسيقوم أحد أعضاء فريقنا بالتواصل معك."
    },
    en: {
      // Navigation
      "nav-home": "Home",
      "nav-who": "Who We Are",
      "nav-programs": "Programs",
      "nav-contact": "Contact",
      
      // Login
      "login-btn": "Login",
      
      // Hero Section
      "hero-title": "A Better Learning Journey & Future begins.",
      "hero-desc": "Start your journey towards a brighter future with our platform. We empower you with essential skills and knowledge to succeed in a changing world. Discover innovative educational paths that enrich your life and unlock new opportunities.",
      "hero-btn1": "Start Now",
      "hero-btn2": "Find The Course",
      
      // Services Section
      "service-exclusive-trainer": "Exclusive trainer",
      "service-exclusive-desc": "Join our Exclusive Trainer program for personalized guidance and expert insights tailored to your learning.",
      "service-creative-minds": "Creative Minds",
      "service-creative-desc": "Unleash your creativity with innovative ideas and strategies that inspire original thinking.",
      "service-visual-lessons": "Visual lessons",
      "service-visual-desc": "Engage with interactive visual lessons designed to enhance your understanding of complex topics.",
      "service-world-numbers": "World Numbers",
      "service-world-desc": "Explore the fascinating world of numerical concepts and their applications in everyday life.",
      "service-read-more": "Read More",
      
      // About Section
      "about-tagline": "About Us",
      "about-title": "Creating a lifelong learning community",
      "about-flexible-title": "Flexible Classes",
      "about-flexible-desc": "flexible and customizable learning sessions tailored to individual needs.",
      "about-live-title": "Live Class From anywhere",
      "about-live-desc": "engaging and interactive classes that can be accessed from anywhere, ensuring convenience and accessibility for all learners.",
      "about-discover-btn": "Discover More",
      "about-need-details": "Need to Know More Details?",
      
      // Category Section
      "category-tagline": "Category",
      "category-title": "Favorite Topics To Learn",
      "category-project-management": "Project Management",
      "category-project-desc": "Specialied Courses",
      "category-business-development": "Business Development",
      "category-business-desc": "Educational Courses",
      "category-data-analysis": "Data Analysis",
      "category-data-desc": "Training Courses",
      "category-business-strategies": "Business strategies",
      "category-strategies-desc": "Workshops",
      
      // Programs Section
      "programs-tagline": "Makeen Programs",
      "programs-title": "Explore a wide range of programs",
      "program-title-1": "Python Essentials",
      "program-desc-1": "Learn Python from scratch with practical examples and projects",
      "program-title-2": "Vue.js 3 Complete Guide",
      "program-desc-2": "Master Vue.js 3 with Composition API, Vuex, and Vue Router for modern web apps",
      "program-title-3": "Docker & Kubernetes",
      "program-desc-3": "Learn containerization and orchestration for modern application deployment",
      "program-title-4": "AWS Cloud Practitioner",
      "program-desc-4": "Get certified in AWS fundamentals and learn cloud computing essentials",
      "program-title-5": "Data Science Fundamentals",
      "program-desc-5": "Learn data analysis, visualization, and machine learning basics with Python",
      "program-title-6": "UI/UX Design Principles",
      "program-desc-6": "Master the fundamentals of user interface and experience design for digital products",
      "badge-open": "Registration Open",
      "view-details": "View Details",
      "view-all": "View All Programs →",
      
      // Counter Section
      "counter-title": "Get Compensation",
      "counter-desc": "It gives you compensation because the generated text for Ipsum is always free of repetition, injected humor, or uncharacteristic words.",
      "counter-join": "Join Now",
      "counter-register": "Register Now and",
      "counter-get": "Get a",
      "counter-compensation": "Compensation",
      
      // Testimonial Section
      "testimonial-tagline": "Testimonial",
      "testimonial-title": "What Our Student Feedback",
      "testimonial-quote-1": "Flexible Classes refers to the process of acquiring knowledge or skills through the use of digital technologies and the internet. Flexible Classes refers to the process flexible Classes refers to the process",
      "testimonial-name-1": "Savannah Nguyen",
      "testimonial-role-1": "UI/UX Designer",
      "testimonial-quote-2": "Flexible Classes refers to the process of acquiring knowledge or skills through the use of digital technologies and the internet. Flexible Classes refers to the process flexible Classes refers to the process",
      "testimonial-name-2": "Christine eve",
      "testimonial-role-2": "Web Developer",
      "testimonial-quote-3": "Flexible Classes refers to the process of acquiring knowledge or skills through the use of digital technologies and the internet. Flexible Classes refers to the process flexible Classes refers to the process",
      "testimonial-name-3": "Sarah Taylor",
      "testimonial-role-3": "Seo Expert",
      
      // CTA Section
      "cta-title": "Skills Certificate from Makeen",
      "cta-btn": "Get Start Now",
      
      // Footer
      "footer-about": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      "footer-contact": "Contact Us",
      "footer-email": "joinmakeen@mtcit.gov.om",
      "footer-website": "www.mtcit.gov.om",
      "footer-copyright": "Copyright <span class='dynamic-year'></span> All rights reserved, Ministry of Transport, Communications and Information Technology, under the management of (GLOBCOM)",
      
      // Meta Information
      "duration-1-5": "1.5 months",
      "duration-2": "2 months",
      "duration-3": "3 months",
      "duration-2-5": "2.5 months",
      "language-both": "English/Arabic",
      "delivery-online": "Online",
      "location-muscat": "Muscat",
      
      // Programs Catalog Page
      "programs-badge": "Makeen Programs",
      "programs-page-title": "Programs Catalog",
      "programs-page-subtitle": "Explore and apply for Makeen programs focused on research, education, and innovation through our user-friendly digital platform",
      "search-placeholder": "Search by Program name...",
      "filter-all": "All Programs",
      "filter-programming": "Programming",
      "filter-design": "Design",
      "filter-data": "Data Science",
      "filter-cloud": "Cloud Computing",
      "no-results": "No programs found matching your search",
      "try-different": "Try different keywords or browse all available programs",
      
      // No Results Messages
      "no-results-title": "Result Not Found",
      "no-results-text": "Whoops... the search result not found, please try a different search",
      
      // Program Details Page
      "program-details-desc": "Dive into the world of programming with our 'Python Essentials' course! This program is designed for beginners and covers the fundamental concepts of Python, including data types, control structures, functions, and libraries. You'll engage in hands-on projects that reinforce your learning and help you build a solid foundation in coding. By the end of the course, you'll be equipped with the skills to tackle real-world programming challenges and create your own applications.",
      "duration-label": "Duration:",
      "duration-3-months": "3 months",
      "language-label": "Language:",
      "language-en-ar": "English & Arabic",
      "mode-label": "Mode:",
      "mode-onsite": "On-site",
      "location-label": "Location:",
      "location-detail": "Al Araimi Boulevard Mall, Al Khoudh, Muscat",
      "registration-dates": "Registration Starts from 30 June till 19 August 2025",
      "enroll-now": "Enrol Now",
      "duration-detail": "3 months",
      "language-detail": "English & Arabic",
      "mode-detail": "On-site",
      
      // Navigation
      "nav-introduction": "Introduction",
      "nav-objectives": "Objectives",
      "nav-requirements": "Enrollment Requirement",
      "nav-attachments": "Required Attachments",
      "nav-partners": "Our Partners",
      "nav-faqs": "FAQs",
      
      // Content Sections
      "section-introduction": "Introduction",
      "introduction-content": "Code Academy Company is dedicated to promoting professional growth through an array of specialized certification programs tailored to meet the evolving needs of the industry. Our initiative, which is proudly backed by the Ministry of Transport, Communications and Information Technology, is designed to alleviate the financial burden on beneficiaries by reimbursing them for the costs incurred during certification exams. This comprehensive program not only aims to motivate national professionals, entrepreneurs, and job seekers to pursue accredited certifications in the fields of communications and information technology but also seeks to empower them with advanced skills and knowledge. By equipping individuals with these essential qualifications, we strive to enhance their expertise in specialized areas that are increasingly sought after in today's competitive labor market, ultimately contributing to a more skilled workforce.",
      
      "section-objectives": "Objectives",
      "objective-1": "Promote professional growth through specialized certification programs.",
      "objective-2": "Tailor programs to meet the evolving needs of the industry.",
      "objective-3": "Alleviate financial burdens by reimbursing certification exam costs.",
      "objective-4": "Motivate national professionals, entrepreneurs, and job seekers to pursue accredited certifications.",
      "objective-5": "Empower individuals with advanced skills and knowledge in communications and information technology.",
      "objective-6": "Enhance expertise in specialized areas sought after in the competitive labor market.",
      "objective-7": "Contribute to a more skilled workforce.",
      
      "section-requirements": "Enrollment Requirements",
      "requirement-1": "The candidate must be of Omani nationality.",
      "requirement-2": "The candidate must be a job seeker.",
      "requirement-3": "The candidate must specialize in Computer Science and Engineering, Information Systems, and Technology.",
      "requirement-4": "The candidate must be interested in comprehensive web application development technologies.",
      "requirement-5": "The participant must commit to completing the program within the specified timeframe.",
      
      "section-attachments": "Required Attachments",
      "attachment-1": "Bachelor's degree",
      "attachment-2": "Job seeker certificate",
      "attachment-3": "Resume",
      
      "section-partners": "Our Partners",
      
      "section-faqs": "FAQs",
      "faq-q1": "What are the key concepts covered in a Python course for beginners in business?",
      "faq-a1": "Key concepts in a beginner Python course for business include data types, control structures, functions, libraries, and data visualization.",
      "faq-q2": "What are the fundamental principles of management that can be applied using Python?",
      "faq-a2": "Python can be applied to management principles through data analysis, automation of repetitive tasks, and creating dashboards for decision-making.",
      "faq-q3": "What Python-based marketing strategies can businesses implement effectively?",
      "faq-a3": "Businesses can use Python for customer segmentation, sentiment analysis, web scraping for market research, and automated email marketing campaigns.",
      "faq-q4": "How does Python play a role in Financial Accounting and why is it crucial for businesses?",
      "faq-a4": "Python helps in financial accounting through automated calculations, generating financial reports, data validation, and creating financial models for forecasting.",
      "faq-q5": "In what ways can Python enhance the understanding of Organizational Behavior in a company?",
      "faq-a5": "Python can analyze employee data, survey responses, and communication patterns to provide insights into organizational behavior and team dynamics.",
      "faq-q6": "How can Python be utilized to explore Business Ethics and Corporate Social Responsibility?",
      "faq-a6": "Python can be used to analyze sustainability metrics, track CSR initiatives, and create reports on ethical business practices and their impact.",
      
      // Start Application Page
      "welcome-dear-name": "Dear Abdul,",
      "welcome-message-content": "Welcome aboard! As we embark on this journey together, I'd like to kick things off by delving into the questionnaire phase and then attachments. This pivotal step serves as our foundation for understanding your needs, preferences, and objectives, allowing us to tailor our approach accordingly.<br /><br />Your input in this phase is invaluable as it lays the groundwork for our collaboration moving forward. By providing thorough and honest responses, you enable us to align our strategies and resources with your unique vision and aspirations.<br /><br />Rest assured, your privacy and confidentiality are of utmost importance to us. Any information shared during this process will be handled with the utmost care and discretion.<br /><br />Thank you in advance for your cooperation and participation. Let's embark on this journey together and pave the way for success!",
      "consent-text": "I hereby confirm that the information I provide is to the best of my knowledge",
      "start-btn": "START"
    }
  };

  let currentLang = localStorage.getItem('site-lang') || 'en';
  let currentScrollPosition = 0;
  let isLanguageSwitching = false;

  function setLangText(lang) {
    console.log('setLangText called with lang:', lang);
    
    try {
      // Set flag to prevent other scroll events during switching
      isLanguageSwitching = true;
      
      // Store current scroll position before any DOM changes
      currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      
      // Update current language
      currentLang = lang;
      localStorage.setItem('site-lang', lang);
      
      // Update document language and direction
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      
      // Apply translations using the global function if available, otherwise use direct method
      if (typeof window.applyTranslations === 'function') {
        console.log('Using global applyTranslations function');
        window.applyTranslations(lang);
      } else {
        console.log('Using direct translation method');
        // Fallback to direct translation update
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (translations[lang] && translations[lang][key]) {
            const translation = translations[lang][key];
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.type === 'submit' || el.type === 'button') {
              el.value = translation;
            } else {
              el.textContent = translation;
            }
          }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
          const key = el.getAttribute('data-i18n-placeholder');
          if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
          }
        });
      }
      
      // Update language switcher labels
      const langLabels = document.querySelectorAll('#current-language, #lang-switch-label, #mobile-current-language, .sticky-header__content #current-language, .sticky-header__content #lang-switch-label');
      langLabels.forEach(label => {
        if (label) label.textContent = lang === 'en' ? 'عربي' : 'English';
      });
      
      // Apply RTL/LTR styles
      applyLanguageStyles(lang);
      
      // Trigger a custom event that other scripts can listen to
      const event = new CustomEvent('languageChanged', { detail: { language: lang } });
      document.dispatchEvent(event);
      
      console.log(`Language switched to ${lang}`);
      
    } catch (error) {
      console.error('Error in setLangText:', error);
      // If something goes wrong, reload the page as a fallback
      window.location.reload();
    } finally {
      // Always reset the flag and restore scroll position
      setTimeout(() => {
        isLanguageSwitching = false;
        if (currentScrollPosition !== undefined) {
          window.scrollTo(0, currentScrollPosition);
        }
      }, 10);
    }
  }

  function applyLanguageStyles(lang) {
    const html = document.documentElement;
    const body = document.body;
    const rtlCss = document.getElementById('rtl-css');
    const rtlCustomCss = document.getElementById('rtl-custom-css');
    
    if (lang === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
      body.classList.add('rtl-lang');
      body.classList.add('arabic-font');
      
      // Enable RTL CSS
      if (rtlCss) rtlCss.disabled = false;
      if (rtlCustomCss) rtlCustomCss.disabled = false;
      
      // Load Google Fonts Tajawal as fallback
      if (!document.getElementById('tajawal-fallback')) {
        const link = document.createElement('link');
        link.id = 'tajawal-fallback';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap';
        document.head.appendChild(link);
      }
      
      // Force font update on body and html
      body.style.fontFamily = '"Tajawal", Arial, sans-serif';
      html.style.fontFamily = '"Tajawal", Arial, sans-serif';
      
      // Update CSS variables directly
      document.documentElement.style.setProperty('--eduact-font', '"Tajawal", Arial, sans-serif');
      document.documentElement.style.setProperty('--heading-font', '"Tajawal", Arial, sans-serif');
      
      // Force refresh of font rendering
      setTimeout(function() {
        // Trigger reflow
        body.style.display = 'none';
        body.offsetHeight; // trigger reflow
        body.style.display = '';
      }, 100);
      
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
      body.classList.remove('rtl-lang');
      body.classList.remove('arabic-font');
      
      // Disable RTL CSS
      if (rtlCss) rtlCss.disabled = true;
      if (rtlCustomCss) rtlCustomCss.disabled = true;
      
      // Reset to Urbanist font
      body.style.fontFamily = '"Urbanist", sans-serif';
      html.style.fontFamily = '"Urbanist", sans-serif';
      
      // Reset CSS variables to Urbanist font
      document.documentElement.style.setProperty('--eduact-font', '"Urbanist", sans-serif');
      document.documentElement.style.setProperty('--heading-font', '"Urbanist", sans-serif');
    }
  }

  function toggleLanguage(e) {
    // Prevent any default behavior that might cause scrolling
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
    
    // Prevent multiple rapid clicks
    if (isLanguageSwitching) {
      return false;
    }
    
    // Determine the new language
    let newLang = currentLang === 'en' ? 'ar' : 'en';
    
    // If the event was triggered by a button with data-lang attribute, use that language
    if (e && e.target && e.target.getAttribute('data-lang')) {
      newLang = e.target.getAttribute('data-lang');
    }
    
    // If we're already on this language, do nothing
    if (newLang === currentLang) {
      return false;
    }
    
    console.log('Switching language to:', newLang);
    
    // Update the active state of language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === newLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // Update the language
    setLangText(newLang);
    
    // Return false to prevent any link navigation
    return false;
  }

  // Fix any language switcher hrefs that might cause scroll issues
  function fixLanguageSwitcherHrefs() {
    const langSwitchers = document.querySelectorAll('#language-toggle, #lang-switch, #mobile-language-toggle, .sticky-header__content #language-toggle, .sticky-header__content #lang-switch, [data-lang-switch]');
    langSwitchers.forEach(function(switcher) {
      if (switcher.getAttribute('href') === '#') {
        switcher.setAttribute('href', 'javascript:void(0);');
      }
    });
  }

  // Make translation functions globally available
  window.applyTranslations = function(lang) {
    if (!translations[lang]) {
      console.error(`No translations found for language: ${lang}`);
      return;
    }
    
    // Update all translatable elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.type === 'submit' || el.type === 'button') {
          el.value = translations[lang][key];
        } else {
          el.textContent = translations[lang][key];
        }
      }
    });
    
    // Update all placeholders
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });
    
    console.log(`Applied translations for ${lang}`);
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    // Fix any problematic hrefs
    fixLanguageSwitcherHrefs();
    
    // Set initial language
    setLangText(currentLang);
    
    // Update dynamic year
    const yearElements = document.querySelectorAll('.dynamic-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => el.textContent = currentYear);
    
    // Add language switcher event listener with proper event handling
    function attachLanguageSwitcherEvents() {
      // Look for language switchers in main navbar, sticky header, mobile navigation, and add-program page
      const langSwitchers = document.querySelectorAll('#language-toggle, #language-toggle-en, #language-toggle-ar, #lang-switch, #mobile-language-toggle, .sticky-header__content #language-toggle, .sticky-header__content #lang-switch');
      
      console.log('Language switchers found:', langSwitchers.length, langSwitchers);
      
      langSwitchers.forEach(function(langSwitcher) {
        // Remove any existing event listeners to prevent conflicts
        langSwitcher.removeEventListener('click', toggleLanguage);
        
        // Add proper event listener
        langSwitcher.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          toggleLanguage(e);
          return false;
        }, { passive: false, capture: true });
        
        // Also handle any parent elements that might interfere
        const langSwitcherParent = langSwitcher.closest('.language-switcher');
        if (langSwitcherParent) {
          langSwitcherParent.addEventListener('click', function(e) {
            if (e.target === langSwitcher || langSwitcher.contains(e.target)) {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
          });
        }
      });
    }
    
    // Initial attachment
    attachLanguageSwitcherEvents();
    
    // Re-attach after sticky header is populated (common in many themes)
    setTimeout(function() {
      fixLanguageSwitcherHrefs();
      attachLanguageSwitcherEvents();
    }, 1000);
    
    // Additional timeout to catch late-loading sticky headers
    setTimeout(function() {
      fixLanguageSwitcherHrefs();
      attachLanguageSwitcherEvents();
    }, 3000);
    
    // Watch for sticky header content changes
    const stickyHeader = document.querySelector('.sticky-header__content');
    if (stickyHeader) {
      const observer = new MutationObserver(function(mutations) {
        let shouldReattach = false;
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            shouldReattach = true;
          }
        });
        
        if (shouldReattach) {
          setTimeout(function() {
            fixLanguageSwitcherHrefs();
            attachLanguageSwitcherEvents();
            // Also update the language label in the newly added content
            const langLabels = document.querySelectorAll('.sticky-header__content #current-language, .sticky-header__content #lang-switch-label');
            langLabels.forEach(function(langLabel) {
              if (langLabel) {
                langLabel.textContent = currentLang === 'en' ? 'عربي' : 'English';
              }
            });
          }, 100);
        }
      });
      
      observer.observe(stickyHeader, {
        childList: true,
        subtree: true
      });
    }
  });

  // Also listen for window load to catch any late-loaded elements
  window.addEventListener('load', function() {
    fixLanguageSwitcherHrefs();
  });

  // Expose functions and translations globally for debugging and other scripts
  window.setLanguage = setLangText;
  window.translations = translations;
  window.toggleLanguage = toggleLanguage;
})(); 