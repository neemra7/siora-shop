export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  customization?: {
    imageUpload?: boolean;
    groups: {
      label: string;
      options: { label: string; price?: number }[];
      textInput?: { placeholder: string; optional?: boolean };
      textWhen?: string;
    }[];
  };
};

export const products: Product[] = [
  {
    id: "eye-medal",
    name: "ميدالية عين",
    description: "قطعة فنية مخصصة بتفاصيل دقيقة.",
    price: 5,
    image: "/images/eye-medal.jpg",
    customization: {
      imageUpload: true,
      groups: [{ label: "اختاري التصميم", options: [
        { label: "عين واحدة" }, { label: "عينان في نفس الميدالية", price: 4 },
        { label: "عين ملوّنة", price: 1 }, { label: "عينان ملوّنتان (وجهين)", price: 6 },
        { label: "حجم كبير (عينان)", price: 3 }, { label: "حجم كبير ملوّن", price: 5 },
      ] }],
    },
  },

  {
    id: "eye-envelope",
    name: "ظرف عيون",
    description: "تصميم فني مميز لمناسباتك وهداياك.",
    price: 7,
    image: "/images/mail.jpg",
    customization: {
      imageUpload: true,
      groups: [{ label: "اختاري الظرف", options: [
        { label: "ظرف عادي" }, { label: "ظرف عالي الجودة", price: 1 },
        { label: "تصميم يحتوي على شخصين", price: 5 },
      ] }],
    },
  },

  {
    id: "eye-necklace",
    name: "سنسال فيه عين",
    description: "قطعة أنيقة تحمل رسمة مخصصة.",
    price: 12,
    image: "/images/eye-necklace.jpg",
    customization: {
      imageUpload: true,
      groups: [{ label: "اختاري الخامة", options: [{ label: "سنسال فضة" }, { label: "سنسال ستانلس ستيل" }] },
        { label: "نقش خلفي (اختياري)", options: [{ label: "بدون نقش" }, { label: "نقش خلفي" }], textWhen: "نقش خلفي", textInput: { placeholder: "اكتبي النقش المطلوب", optional: true } }],
    },
  },

  {
    id: "portrait",
    name: "بورتريه وجه",
    description: "حوّلي صورتك إلى لوحة فنية.",
    price: 20,
    image: "/images/portrait.jpg",
    customization: {
      imageUpload: true,
      groups: [{ label: "مقاس الورق", options: [{ label: "A4" }, { label: "A3", price: 5 }] },
        { label: "عدد الأشخاص", options: [{ label: "شخص واحد" }, { label: "شخصان" }] },
        { label: "إطار", options: [{ label: "بدون إطار" }, { label: "إطار خشبي (+3 د.أ لـ A4 / +5 د.أ لـ A3)", price: 3 }, { label: "إطار خشبي فاخر", price: 5 }] }],
    },
  },

  {
    id: "phone-case",
    name: "كفر موبايل",
    description: "كفر مخصص بتصميمك الخاص.",
    price: 7,
    image: "/images/moblie-cover.jpg",
    customization: {
      imageUpload: true,
      groups: [{ label: "نوع الهاتف", options: [], textInput: { placeholder: "اكتبي نوع الهاتف ورقمه" } }],
    },
  },

  {
    id: "bookmarks",
    name: "فواصل كتب",
    description: "تفاصيل فنية صغيرة ترافق قراءاتك.",
    price: 7,
    image: "/images/bookmark.jpg",
  },
];