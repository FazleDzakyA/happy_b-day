export interface TimelineItem {
  id: number;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export interface WishCard {
  id: number;
  title: string;
  message: string;
  icon: string;
  starColor: string;
}

export interface GalleryPhoto {
  id: number;
  src: string;
  caption: string;
  date: string;
  rotation: number;
}

export const PERSON_NAME = "Luthfia Deanis";
export const AUTHOR_NAME = "Haydar";
export const SPECIAL_DATE = "10 Oktober 2026";
export const INITIAL_RELATIONSHIP_TIMESTAMP = new Date("2026-10-10T00:00:00+07:00").getTime();

export const STORY_QUOTES = [
  "Setiap kisah yang indah selalu dimulai dari satu halaman pertama...",
  "Beberapa orang membuat dunia terasa lebih hangat hanya dengan hadir di dalamnya.",
  "Kamu adalah bab favoritku dan cerita indah yang tak ingin kuakhiri."
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    date: "Awal Pertemuan...",
    title: "Percikan Di Tengah Sunyi",
    subtitle: "Saat takdir mempertemukan kita",
    description: "Aku masih ingat jelas senyuman pertamamu. Waktu seolah melambat, meninggalkan rasa hangat yang terus menetap di hati hingga detik ini.",
    tag: "The Beginning"
  },
  {
    id: 2,
    date: "Mengenal Lebih Dekat...",
    title: "Membuka Lembar Rahasia",
    subtitle: "Canda tawa dan cerita malam",
    description: "Setiap percakapan bersamamu selalu menghadirkan kejutan manis—kelembutan hatimu, tawa manismu, dan cara indahmu menghargai hal-hal kecil.",
    tag: "Getting Close"
  },
  {
    id: 3,
    date: "Menaruh Kagum...",
    title: "Jatuh Hati Tanpa Suara",
    subtitle: "Lebih dari sekadar teman",
    description: "Namamu menjadi notifikasi yang paling kutunggu, suaramu jadi penenang di hari yang riuh, dan hadirmu jadi alasan tersendiri untuk bersyukur.",
    tag: "Falling in Love"
  },
  {
    id: 4,
    date: "10 Oktober 2026...",
    title: "Merayakan Hadirmu",
    subtitle: "Hari istimewa kelahiranmu",
    description: "Hari ini adalah milikmu. Semoga langkahmu selalu dipenuhi kebahagiaan, tawa yang tak pernah pudar, dan rasa dicintai yang tak pernah berkurang.",
    tag: "Special Day"
  }
];

export const ABOUT_TRAITS = [
  {
    title: "Kebaikan Yang Tulus",
    desc: "Hatimu menyimpan kehangatan lembut yang selalu membuat siapa pun di dekatmu merasa nyaman.",
    icon: "✨"
  },
  {
    title: "Senyuman Yang Memikat",
    desc: "Satu senyuman tulus darimu sanggup mengubah hari yang paling mendung menjadi penuh cahaya.",
    icon: "🌸"
  },
  {
    title: "Keanggunan Lembut",
    desc: "Caramu bersikap, berbicara, dan memperlakukan orang lain sungguh memancarkan pesona indah.",
    icon: "💎"
  },
  {
    title: "Kecerian Yang Menular",
    desc: "Tawamu yang lepas selalu membawa kegembiraan murni yang membuat dunia terasa lebih berwarna.",
    icon: "🎀"
  }
];

export const WISH_CARDS: WishCard[] = [
  {
    id: 1,
    title: "Kebahagiaan Tanpa Batas",
    message: "Semoga setiap pagi menyambutmu dengan alasan untuk tersenyum, dan setiap malam membawamu pada kedamaian.",
    icon: "🌟",
    starColor: "#F9D976"
  },
  {
    id: 2,
    title: "Impian Yang Terwujud",
    message: "Semoga setiap cita-cita dan harapan kecil di hatimu dapat mekar lebih indah dari yang kamu bayangkan.",
    icon: "✨",
    starColor: "#FFD6E8"
  },
  {
    id: 3,
    title: "Keceriaan Selamanya",
    message: "Semoga kamu selalu dikelilingi oleh ketulusan, sahabat sejati, dan momen-momen manis yang menghangatkan jiwa.",
    icon: "🌸",
    starColor: "#FFE8EF"
  },
  {
    id: 4,
    title: "Cinta & Ketenangan",
    message: "Di saat sunyi sekalipun, ingatalah selalu bahwa ada seseorang yang sangat menghargai dan menyayangimu.",
    icon: "🕊️",
    starColor: "#F5E6DA"
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: 1, src: "/photos/photo1.jpg", caption: "Senyum manismu 💖", date: "10 Okt 2026", rotation: -4 },
  { id: 2, src: "/photos/photo2.jpg", caption: "Momen penuh keanggunan 🌸", date: "Hari Spesial", rotation: 3 },
  { id: 3, src: "/photos/photo3.jpg", caption: "Canda dan tawa indah ✨", date: "Tak Terlupakan", rotation: -2 },
  { id: 4, src: "/photos/photo4.jpg", caption: "Di antara mekarnya bunga 🌿", date: "Kenangan Manis", rotation: 5 },
  { id: 5, src: "/photos/photo5.jpg", caption: "Menatap kilau senja 🌅", date: "Cahaya Hangat", rotation: -3 },
  { id: 6, src: "/photos/photo6.jpg", caption: "Selalu bersinar terang 💎", date: "Luthfia Deanis", rotation: 2 }
];

export const EVASIVE_NO_RESPONSES = [
  "Eits, gak bisa diklik! 😋",
  "Tombol ini terkunci khusus YES! 🙈",
  "Coba klik YES aja deh 🌸",
  "Gak boleh nolak Haydar dong! 💖",
  "Haydar cuma mau jawaban YES! 😉",
  "Gak bisa kabur dari takdir manis ini 🤭",
  "Yakin mau nolak? Klik tombol merah deh! 💕"
];

export const LOVE_LETTER_TEXT = `Untuk Luthfia Deanis Tersayang,

Jika aku diminta menuliskan semua alasan mengapa kamu begitu berarti bagiku, mungkin tinta ini akan habis jauh sebelum perasaanku selesai tertuang.

Sejak kamu hadir di dalam hidupku, segalanya terasa lebih hangat, terang, dan jauh lebih bermakna. Senyumanmu memiliki keajaiban tersendiri—mampu mengubah hari yang paling riuh menjadi hening yang menenangkan.

Di hari istimewa ini, 10 Oktober 2026, aku ingin kamu tahu betapa bersyukurnya aku bisa mengenalmu dan berjalan di sampingmu. Kamu berhak mendapatkan semua kebahagiaan manis di semesta ini.

Dengan seluruh rasa hangat dan cintaku,
Haydar ❤️`;

export const POETIC_CONFESSION = {
  header: "Ungkapan Hati Untukmu",
  subtitle: "Sebuah Janji & Pernyataan Perasaan",
  lines: [
    "Di antara jutaan bintang di langit malam, matamu adalah cahaya favorit yang selalu kucari...",
    "Aku tak pernah merencanakan untuk jatuh hati sejauh ini, tapi bersamamu, setiap detik terasa seperti rumah.",
    "Kamu adalah alasan di balik senyum tipisku di tengah hari yang lelah, dan nama yang selalu kusebut dalam doa-doa tenangku.",
    "Hari ini, di tanggal 10 Oktober 2026 yang indah ini..."
  ],
  questionText: "Luthfia Deanis...",
  questionSubtext: "Maukah kamu melangkah bersamaku, merajut cerita ini, dan menjadi kekasihku?",
  englishTag: "Will You Be My Girlfriend?"
};
