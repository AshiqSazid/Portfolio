import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Bot,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Wrench,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "Research papers published", value: "12" },
  { label: "Papers under review", value: "4" },
  { label: "International conferences", value: "10" },
];

const education = [
  {
    school: "BRAC University",
    degree: "BSc in Computer Science",
    coursework:
      "Data Structures and Algorithms, Operating Systems, Artificial Intelligence, Neural Networks, Assembly Languages, Database Systems, Digital Image Processing, Computer Architecture, Comparative Learning Algorithms, Computational Theory, Natural Language Processing.",
  },
];

const experience = [
  {
    company: "Sparktech",
    role: "AI Backend Developer",
  },
  {
    company: "Moodifai",
    role: "AI/ML Backend Developer",
    details: [
      "USA-based startup and research company.",
      "Moodsinger - captures and analyzes lyrical and audio sentiment of songs.",
      "TheraMuse - music therapy app supporting children with Down syndrome and individuals living with dementia.",
    ],
  },
];

const publicationAuthors = "Md. Ashiq Ul Islam Sajid, et al.";

const publications = [
  {
    venue: "IEEE Xplore, France",
    date: "Nov 2024",
    title:
      "Optimizing Multimodal Transformers for Medical Image Captioning: Enhancing Automated Descriptions via AI Systems",
  },
  {
    venue: "ICAII, Washington, DC, USA",
    date: "Oct 2025",
    title:
      "Vertical AI for Kidney Stone Detection: Knowledge-Distilled CNNs with Student-Teacher Model for Ultrasound Imaging",
  },
  {
    venue: "ICMLA, Boca Raton, FL, USA",
    date: "Nov 2025",
    title:
      "XAI-PredictFare: Comparative Flight Fare Prediction using Machine Learning Models with Dual Explainability through LIME and SHAP",
  },
  {
    venue: "Springer, Australia",
    date: "Oct 2024",
    title:
      "Enhancing User Experience by Tackling the Cold Start Challenge in Product Recommendation System",
  },
  {
    venue: "Springer, Taiwan",
    date: "Nov 2024",
    title:
      "Augmented 3D U-Net Architecture for Accurate Multimodal MRI Brain Tumor Segmentation",
  },
  {
    venue: "Springer, Taiwan",
    date: "Nov 2024",
    title:
      "Enhanced Calorie Estimation of Solid Foods using Federated Learning and YOLO Models: A Distributed Approach for Collaborative Caloric Data Analysis",
  },
  {
    venue: "ICITS, USA",
    date: "Jan 2025",
    title:
      "A Dual-Mode LLM Framework for Medical and General Language Translation for Breaking Barriers in Healthcare Communication",
  },
  {
    venue: "ISDFS, USA",
    date: "Jan 2025",
    title: "Customer Personality Analysis using Machine Learning with Explainable AI",
  },
  {
    venue: "ICMI, USA",
    date: "Mar 2025",
    title:
      "A Hybrid Attention-Guided Fusion Network with Grad-CAM for MPox Skin Lesion Classification",
  },
  {
    venue: "ICOCT, China",
    date: "Mar 2025",
    title:
      "Advancing Sentiment Analysis: Fine-Tuning LLMs and Traditional Machine Learning Models for Noisy Bangla Texts",
  },
  {
    venue: "AHTBE, Canada",
    date: "Jun 2025",
    title:
      "MedViT-HoVer++ (ViT): A Unified Transformer-Guided Framework for Multitask Nucleus Segmentation, Classification, and Count Regression in Histopathology Images",
  },
  {
    venue: "ACM, Bangladesh",
    date: "Nov 2024",
    title: "Optimized Malaria Identification through Transfer Learning Approach",
  },
];

const projects = [
  {
    title: "MedViT-HoVer++ (ViT)",
    description:
      "Transformer-guided framework for multitask nucleus segmentation, classification, and count regression in histopathology images.",
    href: "https://github.com/AshiqSazid/MedViT-HoVer-ViT-A-Unified-Transformer-Guided-Framework-for-Multitask-Nucleus-Segmentation-Classific/tree/main",
    category: "Machine Learning",
  },
  {
    title: "Military Bullet Detection System",
    description:
      "YOLOv8 pipeline with real-time CCTV inference and Weighted Boxes Fusion ensemble.",
    href: "https://drive.google.com/drive/folders/1iKnKvZZlmp0eMLuE-XW69WwqY3ytjtSD?usp=sharing",
    category: "Machine Learning",
  },
  {
    title: "Brain Tumor Segmentation",
    description:
      "Automated brain tumor detection and segmentation using 3D U-Net and TensorFlow.",
    href: "https://github.com/AshiqSazid/Data-Science-Brain-Tumor-Segmentation",
    category: "Machine Learning",
  },
  {
    title: "Music Annotation Prediction",
    description:
      "MuseScore extension using Mistral 7B to grade performances with pitch, rhythm, and dynamics analysis.",
    href: "https://github.com/AshiqSazid/music-annotation-correction",
    category: "Machine Learning",
  },
  {
    title: "Kidney Knowledge Distillation",
    description:
      "Knowledge-distilled CNNs for ultrasound kidney stone detection.",
    href: "https://github.com/AshiqSazid/kidney-us",
    category: "Machine Learning",
  },
  {
    title: "Music Popularity and Sentiment Prediction",
    description:
      "Predicts popularity and sentiment from lyrics and audio using ML models and Qwen3 8B.",
    href: "https://github.com/AshiqSazid/music",
    category: "Machine Learning",
  },
  {
    title: "AI Sentiment Analysis Chatbot",
    description: "Chatbot built with Django, JavaScript, and SQLite.",
    href: "https://github.com/AshiqSazid/Chatbot",
    category: "Machine Learning",
  },
  {
    title: "Property AI",
    description:
      "RAG + LLM assistant for property discovery with FAISS vector search.",
    href: "https://github.com/AshiqSazid/property_AI",
    category: "Machine Learning",
  },
  {
    title: "Smokebot",
    description:
      "LLM customer support chatbot that handles interruptions and changing questions.",
    href: "https://github.com/AshiqSazid/Smokebot",
    category: "Machine Learning",
  },
  {
    title: "Parking Management System",
    description: "Car parking system built with Laravel and MySQL.",
    href: "https://github.com/AshiqSazid/Parking-Management-system",
    category: "Data Science",
  },
  {
    title: "Enemy Attacking Ball Game",
    description: "Computer graphics game project built with PyOpenGL.",
    href: "https://github.com/AshiqSazid/Enemy-attacking-ball-game-_Computer-Graphics-Project",
    category: "Computer Graphics",
  },
  {
    title: "Car Selling Data Analysis",
    description: "Machine learning model for car price prediction.",
    href: "https://github.com/AshiqSazid/Car-Data-Analysis",
    category: "Data Science",
  },
  {
    title: "Drug Addiction Data Analysis",
    description: "ML analysis and prediction for drug addiction data.",
    href: "https://github.com/AshiqSazid/Drug-Analysis-Data-Analysis",
    category: "Data Science",
  },
  {
    title: "BMW Price Prediction",
    description: "Price prediction for BMW vehicles using machine learning.",
    href: "https://github.com/AshiqSazid/Drug-Analysis-Data-Analysi",
    category: "Data Science",
  },
];

const skills = [
  {
    title: "Programming and Backend",
    description: "Python, Django, Flask, FastAPI.",
    icon: Code2,
  },
  {
    title: "Machine Learning",
    description: "TensorFlow, PyTorch, Keras, scikit-learn, Hugging Face.",
    icon: Brain,
  },
  {
    title: "LLMs and RAG",
    description:
      "LangChain, LlamaIndex, fine-tuning, prompt engineering, DeepSeek, LLaMA, Qwen, GPT, Ollama.",
    icon: Bot,
  },
  {
    title: "Data Science",
    description: "Pandas, NumPy, Matplotlib, Seaborn, SQL, MongoDB.",
    icon: Database,
  },
  {
    title: "Cloud and DevOps",
    description: "AWS, Azure, Kafka, Docker, Linux, Git.",
    icon: Cloud,
  },
  {
    title: "Blockchain and Web3",
    description:
      "Solidity, Truffle, Ethereum, Hyperledger Fabric, Ganache, MetaMask, Web3.js, ERC-721.",
    icon: Wrench,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tilt]"),
    );
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>machine learning</span>
              <span className={styles.pill}>data science</span>
              <span className={styles.pill}>llms</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Md. Ashiq Ul Islam Sajid.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                Computer Science graduate focused on machine learning and data
                science, currently building AI/ML backend systems and publishing
                research.
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Button asChild>
                <Link href="mailto:ashiqsazid494@gmail.com">
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        {/* Objective */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-6"
          >
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Objective
            </span>
            <h2 className="text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
              I am a Computer Science graduate from BRAC University with a focus
              on machine learning and data science.
            </h2>
            <p className="max-w-4xl tracking-tight text-muted-foreground xl:text-lg">
              I have published 10 research papers and have 4 under review,
              including three presented at international conferences in
              Australia and Taiwan. I contribute to open-source projects on{" "}
              <Link
                href="https://github.com/AshiqSazid"
                target="_blank"
                rel="noreferrer noopener"
                className="underline"
              >
                GitHub
              </Link>{" "}
              and I am preparing a submission to a Q1 journal and an A*
              conference.
            </p>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex max-w-6xl flex-col justify-start space-y-8"
          >
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              🎓 Education
            </span>
            <div className="grid gap-6">
              {education.map((item) => (
                <div
                  key={item.school}
                  className="rounded-md border border-white/5 bg-white/5 p-6"
                >
                  <h3 className="text-xl font-medium tracking-tight text-foreground">
                    {item.school}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.degree}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Coursework:
                    </span>{" "}
                    {item.coursework}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex max-w-6xl flex-col justify-start space-y-8"
          >
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              💼 Experience
            </span>
            <h2 className="text-3xl font-semibold tracking-tight tracking-tighter xl:text-5xl">
              AI and ML backend roles.
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {experience.map((item) => (
                <div
                  key={item.company}
                  className="rounded-md border border-white/5 bg-white/5 p-6"
                >
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    {item.company}
                  </span>
                  <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground">
                    {item.role}
                  </h3>
                  {item.details?.length ? (
                    <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications */}
        <section id="publications" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex max-w-6xl flex-col justify-start space-y-8"
          >
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              📄 Publications
            </span>
            <h2 className="text-3xl font-semibold tracking-tight tracking-tighter xl:text-5xl">
              Peer-reviewed research across ML, medical imaging, and NLP.
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {publications.map((publication) => (
                <div
                  key={publication.title}
                  className="rounded-md border border-white/5 bg-white/5 p-5"
                >
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    {publication.venue} · {publication.date}
                  </span>
                  <h3 className="mt-2 text-base font-medium tracking-tight text-foreground">
                    {publication.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {publicationAuthors}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Applied ML and data science work.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Selected projects spanning computer vision, NLP, and data analysis.
            </p>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={project.title} className="md:basis-1/2">
                      <Card data-tilt className="h-full">
                        <CardHeader className="space-y-2">
                          <span className="text-xs uppercase tracking-wide text-muted-foreground">
                            {project.category}
                          </span>
                          <CardTitle className="text-lg font-medium tracking-tight">
                            <Link
                              href={project.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="transition hover:text-primary"
                            >
                              {project.title}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-6 pb-6 text-sm text-muted-foreground">
                          <p>{project.description}</p>
                          <Link
                            href={project.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="mt-4 inline-flex items-center text-xs font-semibold text-primary"
                          >
                            View project
                            <ChevronRight className="ml-1 h-3 w-3" />
                          </Link>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                projects
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Key skills
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    across the stack.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Tools and frameworks used in research and production work.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <Link
                    href="https://github.com/AshiqSazid?tab=repositories"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline"
                  >
                    GitHub projects
                  </Link>
                  <Link
                    href="https://www.youtube.com/@ashiqsazid/videos"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline"
                  >
                    Presentations
                  </Link>
                </div>
              </div>
              {skills.map((skill) => (
                <div
                  key={skill.title}
                  className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <skill.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {skill.title}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {skill.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s collaborate{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Based in Dhaka, Bangladesh and open to research collaborations and
              ML engineering work.
            </p>
            <Button asChild className="mt-6">
              <Link href="mailto:ashiqsazid494@gmail.com">Get in touch</Link>
            </Button>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
