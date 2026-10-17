/* ============================================================================
   CONFIG — ЕДИНСТВЕННОЕ МЕСТО, ГДЕ НУЖНО ЧТО-ТО МЕНЯТЬ
   ----------------------------------------------------------------------------
   Здесь лежат все данные сайта: имя, ссылки, телефон, адрес, цены и все тексты
   на трёх языках. Чтобы поменять цену, добавить услугу или вписать телефон —
   правьте только этот файл. Больше никуда лезть не нужно.

   ВАЖНО: строки в кавычках. Если внутри текста нужна кавычка — используйте
   одинарную ' внутри двойных " или наоборот.

   ⚠ МЕСТА, КОТОРЫЕ НУЖНО ЗАПОЛНИТЬ ПЕРЕД ЗАПУСКОМ, помечены словом TODO.
   ========================================================================== */

window.CONFIG = {

  /* --- Мастер ------------------------------------------------------------ */
  master: {
    nameLat: "VLADYSLAV ZLATOV",   // латиницей — для логотипа и OG
    nameBg:  "Владислав Златов",
    nameRu:  "Владислав Златов",
    since:   2022,                 // год начала работы
    city:    "Варна",
    cityLat: "Varna",
    country: "BG"
  },

  /* --- Контакты и каналы записи ------------------------------------------
     Если поле пустое (""), соответствующая кнопка на сайте просто НЕ появится.
     Ничего ломать не нужно — вписали телефон, кнопка WhatsApp включилась сама. */
  contacts: {
    // Ссылка на систему онлайн-записи. Это главная кнопка сайта.
    booking: "https://n1313281.alteg.io/company/1189021/personal/menu?o=m2672706",

    // Instagram — только username, без @ и без ссылки
    instagram: "goldmill_",

    // Сайт партнёра, чьим инструментом работает мастер (секция Kyone).
    // kyoneclippers.com редиректит сюда — это канонический адрес.
    partnerUrl: "https://www.kyone.com/",

    // TODO: телефон в международном формате, только цифры и + . Пример: "+359888123456"
    // Пока пусто — кнопки «Позвонить» и «WhatsApp» скрыты автоматически.
    phone: "",

    // TODO: номер для WhatsApp, только цифры без + и пробелов. Пример: "359888123456"
    // Обычно тот же номер, что и телефон. Пусто — кнопка WhatsApp скрыта.
    whatsapp: "",

    // Текст, который подставится в WhatsApp, когда клиент нажмёт кнопку
    whatsappText: {
      bg: "Здравей! Искам да запазя час за подстригване.",
      ru: "Здравствуйте! Хочу записаться на стрижку.",
      en: "Hi! I'd like to book a haircut."
    }
  },

  /* --- Адрес и карта ------------------------------------------------------
     ⚠ ЗАГЛУШКА. Точного адреса в брифе не было. Сейчас стоят координаты
     центра Варны, а на сайте вместо улицы показывается честная фраза
     «точный адрес подтверждается при записи».
     TODO: когда придёт настоящий адрес — впишите street, lat и lng,
     и поставьте exact: true. Тогда адрес появится на странице и в разметке
     для Google. */
  address: {
    exact: false,                       // true — показывать улицу на сайте
    street: "",                         // TODO: "ул. Примерна 12"
    district: "",                       // TODO: район, например "Гръцка махала"
    lat: 43.20484,                      // TODO: широта точки
    lng: 27.91751,                      // TODO: долгота точки
    landmark: {                         // ориентир: «вход со двора, рядом с аптекой»
      bg: "", ru: "", en: ""            // TODO
    }
  },

  /* --- График работы ------------------------------------------------------
     Запись свободная, по ссылке. Если появится фиксированный график —
     заполните weekly (пример внутри) и поставьте freeSchedule: false. */
  hours: {
    freeSchedule: true,
    // Пример на будущее: { mo:"10:00–20:00", tu:"10:00–20:00", ... , su:"почивен" }
    weekly: null
  },

  /* --- Услуги и цены ------------------------------------------------------
     price   — цена в евро (число)
     priceBgn— цена в левах (число), для второй строки
     mins    — длительность в минутах
     name/desc — названия и описания на трёх языках.
     Порядок в этом списке = порядок на сайте. Чтобы убрать услугу — удалите
     весь её блок { ... } вместе с запятой. */
  services: [
    {
      price: 30, priceBgn: 58.67, mins: 60,
      name: {
        bg: "Мъжко подстригване",
        ru: "Мужская стрижка",
        en: "Men's haircut"
      },
      desc: {
        bg: "Консултация, измиване преди и след, прецизно подстригване и контуриране, оформяне на вежди, кола маска на нос и уши, стилизация и съвети за домашна грижа. Класика или модерна визия — както решим.",
        ru: "Консультация, мытьё до и после, точная стрижка и окантовка, оформление бровей, воск нос и уши, укладка и советы по уходу дома. Классика или современная форма — как решим.",
        en: "Consultation, wash before and after, precise cut and outlining, brow shaping, nose and ear waxing, styling and home-care advice. Classic or modern — your call."
      }
    },
    {
      price: 35, priceBgn: 68.45, mins: 60,
      name: {
        bg: "Мъжко подстригване за дълга коса",
        ru: "Мужская стрижка на длинные волосы",
        en: "Men's long hair haircut"
      },
      desc: {
        bg: "Внимателно оформяне и поддръжка на дълга коса според типа коса и желаната форма. Консултация, измиване, подстригване и стилизация.",
        ru: "Аккуратная форма и уход за длинными волосами — под тип волос и нужную форму. Консультация, мытьё, стрижка, укладка.",
        en: "Careful shaping and upkeep of long hair, matched to hair type and the shape you want. Consultation, wash, cut, styling."
      }
    },
    {
      price: 45, priceBgn: 88.01, mins: 90,
      name: {
        bg: "Подстригване и камуфлиране на коса",
        ru: "Стрижка с камуфляжем седины",
        en: "Haircut & hair camouflage"
      },
      desc: {
        bg: "Подстригване, съчетано с камуфлиране на бели или редки косми чрез специални техники и продукти. Включва консултация, измиване, подстригване, камуфлаж и стилизация.",
        ru: "Стрижка плюс камуфляж седых или редких волос специальными техниками и составами. Консультация, мытьё, стрижка, камуфляж, укладка.",
        en: "A cut combined with camouflage of grey or thinning hair using dedicated techniques and products. Consultation, wash, cut, camouflage, styling."
      }
    },
    {
      price: 45, priceBgn: 88.01, mins: 60,
      name: {
        bg: "Едновременно подстригване за баща и син",
        ru: "Стрижка отца и сына",
        en: "Father & son haircut"
      },
      desc: {
        bg: "Две подстригвания в рамките на един час — за баща и син.",
        ru: "Две стрижки в течение одного часа — отцу и сыну.",
        en: "Two haircuts within one hour — for father and son."
      }
    },
    {
      price: 25, priceBgn: 48.90, mins: 45,
      name: {
        bg: "Кралско оформяне на брада",
        ru: "Королевское оформление бороды",
        en: "Royal beard shaping"
      },
      desc: {
        bg: "Оформяне на брада с внимание към детайла и висококачествени продукти. Комплексна грижа за брада и лице: пачове, горещи хавлии, маска и кола маска.",
        ru: "Форма бороды с вниманием к деталям и качественными составами. Полный уход за бородой и лицом: патчи, горячие полотенца, маска, воск.",
        en: "Beard shaping with attention to detail and high-quality products. Full beard and face care: patches, hot towels, mask, waxing."
      }
    },
    {
      price: 35, priceBgn: 68.45, mins: 60,
      name: {
        bg: "Оформяне и камуфлиране на брада",
        ru: "Оформление бороды с камуфляжем",
        en: "Beard shaping & camouflage"
      },
      desc: {
        bg: "Оформяне на брада с камуфлиране на сиви косми и неравности за свеж и поддържан вид. Включва консултация и грижа.",
        ru: "Оформление бороды с камуфляжем седины и неровностей — для свежего, ухоженного вида. Консультация и уход входят.",
        en: "Beard shaping with camouflage of grey hairs and patchiness for a fresh, kept look. Consultation and care included."
      }
    },
    {
      price: 25, priceBgn: 48.90, mins: 30,
      name: {
        bg: "Кралско бръснене",
        ru: "Королевское бритьё",
        en: "Royal shave"
      },
      desc: {
        bg: "Бръснене с топла кърпа и висококачествени продукти. Подготовка на кожата, класическо бръснене с ножче, овлажняване и финален масаж.",
        ru: "Бритьё с горячим полотенцем и качественными составами. Подготовка кожи, классическое бритьё опасной, увлажнение, финальный массаж.",
        en: "Shave with a hot towel and high-quality products. Skin prep, classic razor shave, moisturising and a closing massage."
      }
    }
  ],

  /* --- Отзывы --------------------------------------------------------------
     ⚠ ГЛАВНОЕ ПРАВИЛО: сюда попадают ТОЛЬКО настоящие отзывы реальных клиентов.
     Выдуманные отзывы в ЕС запрещены (директива Omnibus), отвечает владелец сайта.

     Как это работает:

     demo: true   — на сайте видна секция-образец. Карточки помечены плашкой
                    «ПРИМЕР», текст заведомо служебный. Нужно, чтобы показать
                    клиенту, как секция будет выглядеть, когда отзывы появятся.
     demo: false  — показываются только записи из items. Если items пуст,
                    секция не выводится вообще.

     ПЕРЕД ПУБЛИКАЦИЕЙ: впишите настоящие отзывы в items и поставьте demo: false.
     Если отзывов пока нет — просто поставьте demo: false, секция исчезнет.

     Формат записи:
       { name: "Име", source: "Google", text: { bg: "...", ru: "...", en: "..." } }
     source — откуда отзыв: Google, Instagram и т. д. Можно оставить пустым.  */
  reviews: {
    demo: true,
    items: []
  },

  /* --- Работы -------------------------------------------------------------
     src — имя файла без размера и расширения (в папке images лежат две
     версии: -460 и -720). alt — подпись для поисковика и для незрячих. */
  works: [
    { src: "work-fade",   w: 664, h: 830, alt: { bg: "Фейд отзад, мъжко подстригване, Варна", ru: "Фейд сзади, мужская стрижка, Варна", en: "Back fade, men's haircut, Varna" }, cap: { bg: "Фейд отзад", ru: "Фейд сзади", en: "Back fade" } },
    { src: "work-fade2",  w: 657, h: 822, alt: { bg: "Преход отблизо, машинка по тила, Варна", ru: "Переход крупным планом, машинка по затылку, Варна", en: "Close-up fade, clipper at the nape, Varna" }, cap: { bg: "Преходът отблизо", ru: "Переход крупно", en: "The fade, up close" } },
    { src: "work-temple", w: 648, h: 810, alt: { bg: "Работа с машинка Kyone по слепоочието, Варна", ru: "Работа машинкой Kyone у виска, Варна", en: "Kyone clipper work at the temple, Varna" }, cap: { bg: "Преход при слепоочието", ru: "Переход у виска", en: "Transition at the temple" } },
    { src: "work-over",   w: 640, h: 800, alt: { bg: "Владислав Златов подстригва клиент, Варна", ru: "Владислав Златов стрижёт клиента, Варна", en: "Vladyslav Zlatov cutting a client, Varna" }, cap: { bg: "В работа", ru: "В работе", en: "Mid-cut" } },
    { src: "work-cut",    w: 660, h: 825, alt: { bg: "Владислав Златов зад стола в залата, Варна", ru: "Владислав Златов за креслом в зале, Варна", en: "Vladyslav Zlatov behind the chair, Varna" }, cap: { bg: "Зад стола", ru: "За креслом", en: "Behind the chair" } },
    { src: "work-shop",   w: 670, h: 837, alt: { bg: "Готово подстригване, клиент в стола, Варна", ru: "Готовая стрижка, клиент в кресле, Варна", en: "Finished haircut, client in the chair, Varna" }, cap: { bg: "Готова работа", ru: "Готовая работа", en: "Finished" } },
    { src: "work-stage",  w: 630, h: 787, alt: { bg: "Демонстрация на подстригване пред зала", ru: "Показательная стрижка на сцене", en: "Live haircut demonstration on stage" }, cap: { bg: "На сцената", ru: "На сцене", en: "On stage" } },
    { src: "work-stage2", w: 600, h: 750, alt: { bg: "Резултатът след демонстрация на семинар", ru: "Результат после показательной работы на семинаре", en: "The result after a live demonstration" }, cap: { bg: "След демонстрацията", ru: "После демонстрации", en: "After the demo" } },
    { src: "work-kyone",  w: 720, h: 900, alt: { bg: "Машинка Kyone на брега във Варна", ru: "Машинка Kyone на берегу в Варне", en: "Kyone clipper on the shore in Varna" }, cap: { bg: "Kyone, брегът на Варна", ru: "Kyone, берег Варны", en: "Kyone, Varna shore" } }
  ],

  /* --- Тексты сайта на трёх языках ---------------------------------------
     Болгарский — основной. Меняйте текст прямо здесь.                       */
  i18n: {

    bg: {
      langName: "Български",
      metaTitle: "Барбер Владислав Златов — Варна | Мъжко подстригване и бръснене",
      metaDesc: "Владислав Златов — chief barber във Варна от 2022. Мъжко подстригване, брада, кралско бръснене. Цени от 25 €. Онлайн запис за час.",
      skip: "Към съдържанието",
      navServices: "Услуги", navWork: "Работи", navAcademy: "Обучения", navAbout: "За мен", navContact: "Контакти",
      menuOpen: "Отвори менюто", menuClose: "Затвори менюто",

      heroName: "Владислав<br>Златов",
      heroLead: "Chief barber. Уча барбери. Амбасадор на Kyone.",
      heroFrom: "от",
      legServices: "Услуги",
      legServicesVal: "Подстригване · брада · кралско бръснене",
      legPlace: "Място",
      legSince: "От",
      cta: "Запази час",
      ctaShort: "Запази час",
      ctaIg: "Пиши в Instagram",
      ctaWa: "Пиши в WhatsApp",
      ctaCall: "Обади се",
      scrollHint: "Цени по-долу",

      servicesTitle: "Услуги и цени",
      servicesNote: "Цените са крайни. Плащане на място.",
      min: "мин", hour: "ч",

      workTitle: "Работи",
      workNote: "Кадри от стола и от сцената. Без чужди снимки.",
      workMeta: "Варна",
      navReviews: "Отзиви",
      reviewsTitle: "Отзиви",
      reviewsNote: "Така изглежда секцията. Долните три карти са макет — истинските отзиви идват на тяхно място.",
      reviewsDemoBadge: "Макет",
      reviewsDemoName: "Име на клиент",
      reviewsDemoText1: "Тук стои това, което клиентът е написал сам — с неговите думи и неговия правопис. Два-три реда изглеждат най-естествено в тази карта.",
      reviewsDemoText2: "Кратък отзив също работи. Понякога един ред казва повече от цял абзац.",
      reviewsDemoText3: "По-дълъг отзив се събира спокойно: клиентът може да разкаже за консултацията, за самото подстригване и за това дали формата се е запазила след седмица.",
      aboutMeta: "от 2022",
      colophon: "Лист 01 · Варна",

      academyTitle: "Уча барбери",
      academyLead: "Освен зад стола стоя и на сцената.",
      academyText: "Водя семинари и академии за барбери — показвам техники, работя на живо пред зала и помагам на начинаещи да излязат от нивото, на което са заседнали.",
      academyTag: "Семинари и академии",
      navKyone: "Kyone",
      kyoneTitle: "Амбасадор на Kyone",
      kyoneMeta: "Kyone Clippers",
      kyoneLead: "Лице съм на Kyone Clippers.",
      kyoneText: "С техния инструмент работя всеки ден — и зад стола, и на сцената, когато показвам техники на семинарите.",
      kyoneGo: "kyone.com",

      aboutTitle: "За мен",
      aboutText: "Казвам се Владислав. Стрижа във Варна от 2022. Работя бавно и гледам формата от всички страни, преди да пусна машинката. Обичам чисти преходи и брада, която стои сама, без всеки ден да я оправяш. Говорим на български, руски или английски — както ти е удобно.",

      contactTitle: "Как да запазиш час",
      contactLead: "Най-бързо е през формата за запис — виждаш свободните часове и избираш сам.",
      hoursTitle: "График",
      hoursFree: "Свободен запис през формата. Часовете, които виждаш там, са реални.",
      addressTitle: "Място",
      addressPending: "Варна. Точният адрес идва в потвърждението след записа.",
      addressMap: "Отвори в Google Maps",
      igTitle: "Instagram",
      igNote: "Нови работи всяка седмица.",

      footerNote: "Владислав Златов · барбер · Варна",
      footerRights: "Всички права запазени.",
      langLabel: "Език",

      err404: "Няма такава страница",
      err404Text: "Линкът е стар или сгрешен. Върни се в началото — там са цените и записът.",
      err404Back: "Към началото"
    },

    ru: {
      langName: "Русский",
      metaTitle: "Барбер Владислав Златов — Варна | Мужская стрижка и бритьё",
      metaDesc: "Владислав Златов — chief barber в Варне с 2022. Мужская стрижка, борода, королевское бритьё. Цены от 25 €. Онлайн-запись.",
      skip: "К содержанию",
      navServices: "Услуги", navWork: "Работы", navAcademy: "Обучение", navAbout: "Обо мне", navContact: "Контакты",
      menuOpen: "Открыть меню", menuClose: "Закрыть меню",

      heroName: "Владислав<br>Златов",
      heroLead: "Chief barber. Учу барберов. Амбассадор Kyone.",
      heroFrom: "от",
      legServices: "Услуги",
      legServicesVal: "Стрижка · борода · королевское бритьё",
      legPlace: "Место",
      legSince: "С",
      cta: "Записаться",
      ctaShort: "Записаться",
      ctaIg: "Написать в Instagram",
      ctaWa: "Написать в WhatsApp",
      ctaCall: "Позвонить",
      scrollHint: "Цены ниже",

      servicesTitle: "Услуги и цены",
      servicesNote: "Цены окончательные. Оплата на месте.",
      min: "мин", hour: "ч",

      workTitle: "Работы",
      workNote: "Кадры из кресла и со сцены. Чужих фото нет.",
      workMeta: "Варна",
      navReviews: "Отзывы",
      reviewsTitle: "Отзывы",
      reviewsNote: "Так выглядит секция. Три карточки ниже — макет, на их место встанут настоящие отзывы.",
      reviewsDemoBadge: "Макет",
      reviewsDemoName: "Имя клиента",
      reviewsDemoText1: "Здесь стоит то, что клиент написал сам — его словами и его орфографией. Две-три строки смотрятся в карточке естественнее всего.",
      reviewsDemoText2: "Короткий отзыв тоже работает. Иногда одна строка говорит больше абзаца.",
      reviewsDemoText3: "Длинный отзыв помещается спокойно: клиент может рассказать про консультацию, про саму стрижку и про то, держится ли форма через неделю.",
      aboutMeta: "с 2022",
      colophon: "Лист 01 · Варна",

      academyTitle: "Учу барберов",
      academyLead: "Кроме кресла у меня есть сцена.",
      academyText: "Веду семинары и академии для барберов — показываю техники, работаю вживую перед залом и помогаю новичкам сойти с уровня, на котором они застряли.",
      academyTag: "Семинары и академии",
      navKyone: "Kyone",
      kyoneTitle: "Амбассадор Kyone",
      kyoneMeta: "Kyone Clippers",
      kyoneLead: "Я лицо Kyone Clippers.",
      kyoneText: "Их инструментом работаю каждый день — и в кресле, и на сцене, когда показываю техники на семинарах.",
      kyoneGo: "kyone.com",

      aboutTitle: "Обо мне",
      aboutText: "Меня зовут Владислав. Стригу в Варне с 2022. Работаю не спеша и смотрю форму со всех сторон, прежде чем включить машинку. Люблю чистые переходы и бороду, которая держится сама, без ежедневной возни. Говорим по-болгарски, по-русски или по-английски — как удобнее.",

      contactTitle: "Как записаться",
      contactLead: "Быстрее всего через форму записи — там видны свободные окна, выбираете сами.",
      hoursTitle: "График",
      hoursFree: "Свободная запись через форму. Часы, которые там видны, — реальные.",
      addressTitle: "Место",
      addressPending: "Варна. Точный адрес приходит в подтверждении после записи.",
      addressMap: "Открыть в Google Maps",
      igTitle: "Instagram",
      igNote: "Новые работы каждую неделю.",

      footerNote: "Владислав Златов · барбер · Варна",
      footerRights: "Все права защищены.",
      langLabel: "Язык",

      err404: "Такой страницы нет",
      err404Text: "Ссылка старая или с опечаткой. Вернитесь на главную — там цены и запись.",
      err404Back: "На главную"
    },

    en: {
      langName: "English",
      metaTitle: "Barber Vladyslav Zlatov — Varna | Men's haircut & shave",
      metaDesc: "Vladyslav Zlatov — chief barber in Varna since 2022. Men's haircuts, beard work, royal shave. From €25. Book online.",
      skip: "Skip to content",
      navServices: "Services", navWork: "Work", navAcademy: "Teaching", navAbout: "About", navContact: "Contact",
      menuOpen: "Open menu", menuClose: "Close menu",

      heroName: "Vladyslav<br>Zlatov",
      heroLead: "Chief barber. I teach barbers. Kyone ambassador.",
      heroFrom: "from",
      legServices: "Services",
      legServicesVal: "Haircuts · beard · royal shave",
      legPlace: "Place",
      legSince: "Since",
      cta: "Book a slot",
      ctaShort: "Book a slot",
      ctaIg: "Message on Instagram",
      ctaWa: "Message on WhatsApp",
      ctaCall: "Call",
      scrollHint: "Prices below",

      servicesTitle: "Services & prices",
      servicesNote: "Prices are final. Payment on site.",
      min: "min", hour: "h",

      workTitle: "Work",
      workNote: "Shots from the chair and from the stage. No stock photos.",
      workMeta: "Varna",
      navReviews: "Reviews",
      reviewsTitle: "Reviews",
      reviewsNote: "This is how the section looks. The three cards below are a mock-up — real reviews take their place.",
      reviewsDemoBadge: "Mock-up",
      reviewsDemoName: "Client name",
      reviewsDemoText1: "This is where the client's own words go — their phrasing, their spelling. Two or three lines sit most naturally in this card.",
      reviewsDemoText2: "A short review works too. Sometimes one line says more than a paragraph.",
      reviewsDemoText3: "A longer review fits comfortably: the client can talk about the consultation, the cut itself, and whether the shape held up a week later.",
      aboutMeta: "since 2022",
      colophon: "Sheet 01 · Varna",

      academyTitle: "I teach barbers",
      academyLead: "Besides the chair, there's the stage.",
      academyText: "I run seminars and academies for barbers — I show techniques, work live in front of a room, and help beginners get past the level they're stuck on.",
      academyTag: "Seminars & academies",
      navKyone: "Kyone",
      kyoneTitle: "Kyone ambassador",
      kyoneMeta: "Kyone Clippers",
      kyoneLead: "I'm the face of Kyone Clippers.",
      kyoneText: "I work with their tools every day — behind the chair and on stage when I demonstrate techniques at seminars.",
      kyoneGo: "kyone.com",

      aboutTitle: "About me",
      aboutText: "I'm Vladyslav. I've been cutting in Varna since 2022. I work slowly and check the shape from every side before the clipper goes on. I like clean fades and a beard that holds by itself, without daily fixing. We can speak Bulgarian, Russian or English — whichever suits you.",

      contactTitle: "How to book",
      contactLead: "The booking form is fastest — you see the open slots and pick one yourself.",
      hoursTitle: "Hours",
      hoursFree: "Open booking through the form. The slots you see there are real.",
      addressTitle: "Location",
      addressPending: "Varna. The exact address comes with your booking confirmation.",
      addressMap: "Open in Google Maps",
      igTitle: "Instagram",
      igNote: "New work every week.",

      footerNote: "Vladyslav Zlatov · barber · Varna",
      footerRights: "All rights reserved.",
      langLabel: "Language",

      err404: "Page not found",
      err404Text: "The link is old or mistyped. Head back to the start — prices and booking are there.",
      err404Back: "Back to start"
    }
  }
};
