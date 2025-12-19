const navLinks = [
  {
    name: "Projects",
    link: "#work",
  },
//   {
//     name: "Experience",
//     link: "#experience", TODO: UNCOMMENT WHEN EXPERIENCE SECTION IS READY
//   },
  {
    name: "Skills",
    link: "#skills",
  },
//   {
//     name: "Testimonials",
//     link: "#testimonials",
//   },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 1, suffix: "+", label: "Year of Experience" },
  { value: 15, suffix: "+", label: "Satisfied Clients" },
  { value: 50, suffix: "+", label: "Completed Projects" },
  { value: 1.3, suffix: "", label: "General Weighted Average" },
];

const logoIconsList = [
  {
    imgPath: "./images/logos/company-logo-1.png",
  },
  {
    imgPath: "./images/logos/company-logo-2.png",
  },
  {
    imgPath: "./images/logos/company-logo-3.png",
  },
  {
    imgPath: "./images/logos/company-logo-4.png",
  },
  {
    imgPath: "./images/logos/company-logo-5.png",
  },
  {
    imgPath: "./images/logos/company-logo-6.png",
  },
];

const abilities = [
  {
    imgPath: "./images/seo.png",
    title: "Quality-Driven Development",
    desc: "Delivering robust, scalable, and high-performance applications by prioritizing quality and meticulous attention to detail.",
  },
  {
    imgPath: "./images/chat.png",
    title: "Collaborative Problem-Solving",
    desc: "Ensuring project success through clear communication and a collaborative approach to overcome challenges and align with stakeholder goals.",
  },
  {
    imgPath: "./images/time.png",
    title: "Results-Oriented Delivery",
    desc: "A proven track record of delivering projects on schedule, translating strategic objectives into tangible results without sacrificing quality.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "./models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "./models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "./models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "./models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "./models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

// const expCards = [
//   {
//     review:
//       "",
//     imgPath: "/images/exp1.png",
//     logoPath: "/images/logo1.png",
//     title: "",
//     date: "January 2023 - Present",
//     responsibilities: [
//     ],
//   },
// ];

// const expLogos = [
//   {
//     name: "logo1",
//     imgPath: "/images/logo1.png",
//   },
//   {
//     name: "logo2",
//     imgPath: "/images/logo2.png",
//   },
//   {
//     name: "logo3",
//     imgPath: "/images/logo3.png",
//   },
// ];

// const testimonials = [
//   {
//     name: "",
//     mentions: "",
//     review:
//       "",
//     imgPath: "",
//   },
// ];

const socialImgs = [

  {
    name: "fb",
    url:"https://www.facebook.com/Ernest",
    imgPath: "./images/fb.png",
  },
  {
    name: "linkedin",
    url:"https://www.linkedin.com/in/ernest-4494a4393/",
    imgPath: "./images/linkedin.png",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
//   expCards,
//   expLogos,
//   testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
