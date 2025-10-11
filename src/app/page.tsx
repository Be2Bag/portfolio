"use client";

// =============================================
// การ Import ไลบรารี่และ Components ที่จำเป็น
// =============================================
import type React from "react";
import { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "motion/react";
import { useRef } from "react";
import {
  Github,
  Linkedin,
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// =============================================
// Components สำหรับ Animation และ Effects
// =============================================
/**
 * TypingAnimation Component
 * - สร้างเอฟเฟกต์พิมพ์ข้อความทีละตัวอักษร
 * - ปรับแต่ง: เปลี่ยน text, ความเร็วในการพิมพ์ (100ms)
 * - เปลี่ยนสี cursor ได้ที่ bg-current
 */
const TypingAnimation = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  // ตัวแปรสำหรับจัดเก็บข้อความที่แสดงและตำแหน่งตัวอักษรปัจจุบัน
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect สำหรับควบคุมการพิมพ์ข้อความทีละตัวอักษร
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100); // ปรับความเร็วการพิมพ์ได้ที่นี่ (หน่วย: milliseconds)
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className={className}>
      {displayText}
      {/* Cursor กระพริบ */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="inline-block w-0.5 h-6 bg-current ml-1"
      />
    </span>
  );
};

/**
 * TextAnimate Component
 * - สร้างเอฟเฟกต์ fade-in เมื่อ scroll มาถึงตำแหน่งนั้น
 * - ปรับแต่ง: เปลี่ยน duration, opacity, y offset
 * - ใช้สำหรับหัวข้อและข้อความสำคัญ
 */
const TextAnimate = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // once: true = animation เล่นครั้งเดียว
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 20 }, // ตำแหน่งเริ่มต้น: โปร่งใส + เลื่อนลง 20px
        visible: { opacity: 1, y: 0 }, // ตำแหน่งสุดท้าย: ทึบ + ตำแหน่งปกติ
      }}
      transition={{ duration: 0.6 }} // ระยะเวลา animation (ปรับได้)
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * FloatingCard Component
 * - สร้างเอฟเฟกต์การ์ดลอยขึ้นและ hover
 * - ปรับแต่ง: delay (หน่วงเวลา), y offset, hover distance
 * - ใช้สำหรับ skill cards และ project cards
 */
const FloatingCard = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // เริ่มต้น: โปร่งใส + เลื่อนลง 50px
      animate={{ opacity: 1, y: 0 }} // สุดท้าย: ทึบ + ตำแหน่งปกติ
      transition={{ duration: 0.6, delay }} // delay สำหรับเอฟเฟกต์ทีละใบ
      whileHover={{ y: -5, transition: { duration: 0.2 } }} // hover: ลอยขึ้น 5px
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

// =============================================
// Navigation Bar Component
// =============================================
/**
 * Navbar Component
 * - แถบเมนูด้านบนที่เปลี่ยนรูปแบบตาม scroll
 * - ปรับแต่ง: เมนูรายการ, สี, ความโปร่งใส
 * - เปลี่ยนจุดเริ่ม scroll effect ที่ scrollY > 50
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // ตรวจจับการ scroll เพื่อเปลี่ยนรูปแบบ navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // เปลี่ยนค่าได้ตามต้องการ
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }} // เริ่มต้นเลื่อนขึ้นไปด้านบน
      animate={{ y: 0 }} // เลื่อนลงมาตำแหน่งปกติ
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/80 shadow-lg"
          : "backdrop-blur-sm bg-white/60"
      }`}
      style={{
        borderRadius: "24px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <nav className="px-6 py-3">
        <div className="flex items-center space-x-8">
          {/* Logo/Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            PS {/* เปลี่ยนชื่อ/โลโก้ได้ที่นี่ */}
          </motion.div>

          {/* เมนูหลัก - เพิ่ม/ลด รายการได้ */}
          <div className="hidden md:flex space-x-6">
            {["Home", "Skills", "Projects", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.05 }}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

// =============================================
// Main Portfolio Component
// =============================================
export default function Portfolio() {
  // =============================================
  // ข้อมูล Skills - แก้ไข/เพิ่ม/ลด ได้ที่นี่
  // =============================================
  const skills = [
    { name: "JavaScript", icon: "🦨", color: "from-yellow-400 to-orange-500" }, // สดกว่าของเดิม
    { name: "Golang", icon: "🐹", color: "from-sky-500 to-blue-700" }, // ความเข้มเพิ่มขึ้น
    { name: "MongoDB", icon: "🍃", color: "from-lime-500 to-emerald-700" }, // เขียวเด่นขึ้น
    { name: "PostgreSQL", icon: "🐘", color: "from-indigo-500 to-indigo-800" }, // เพิ่ม contrast
    { name: "Redis", icon: "🧠", color: "from-red-500 to-rose-700" }, // แดงสด+ลึก
    { name: "Docker", icon: "🐳", color: "from-cyan-400 to-blue-600" }, // น้ำทะเลสดใสกว่าเดิม
    { name: "MySQL", icon: "🐬", color: "from-teal-400 to-blue-700" }, // gradient สว่างไปเข้ม
    { name: "Git & GitHub", icon: "🐙", color: "from-orange-500 to-red-600" }, // ส้ม-แดงแรงๆ
    { name: "WebSockets", icon: "📡", color: "from-purple-400 to-fuchsia-600" }, // ม่วง-ชมพูสด
    { name: "Swagger", icon: "📘", color: "from-lime-400 to-green-600" }, // เขียว neon
    { name: "GCP", icon: "☁️", color: "from-blue-400 to-yellow-400" }, // ฟ้า-เหลืองตัดกันชัด
    {
      name: "Auth & Security",
      icon: "🔐",
      color: "from-yellow-500 to-rose-600", // สีตัดกันดูเด่น
    },
  ];

  // =============================================
  // ข้อมูล Projects - แก้ไข/เพิ่ม/ลด ได้ที่นี่
  // =============================================
  const projects = [
    {
      title: "NCDs Prevention",
      description:
        "Preventing non-communicable diseases in the community by modifying risk groups for chronic diseases to return to normal health before progressing to illness.",
      image: "https://i.postimg.cc/qBYFk9K6/ncd.png?height=200&width=300", // เปลี่ยนเป็นรูปจริง
      tech: ["Vue.js", "Golang", "MongoDB"],
      link: "#", // ใส่ลิงก์จริง
    },
    {
      title: "MOPH KIOSK",
      description:
        "The service registration system via self-service kiosks manages service queues by department and sends notifications through the MOPH Station Line official account.",
      image: "https://i.postimg.cc/BnfwFHMq/kiosk.png?height=200&width=300", // เปลี่ยนเป็นรูปจริง
      tech: ["Vue.js", "Node.js", "MongoDB"],
      link: "#", // ใส่ลิงก์จริง
    },
    {
      title: "PCU Standard",
      description:
        "Information and Standards System for Primary Health Care Units",
      image: "https://i.postimg.cc/bw0V9rB1/pcu.png?height=200&width=300", // เปลี่ยนเป็นรูปจริง
      tech: ["Vue.js", "Node.js", "MongoDB"],
      link: "#", // ใส่ลิงก์จริง
    },
    {
      title: "Health Book",
      description:
        "A digital health record platform designed to help users track and monitor their personal medical history.",
      image: "https://i.postimg.cc/QMQkSzJW/image.png?height=200&width=300", // เปลี่ยนเป็นรูปจริง
      tech: ["Vue.js", "Golang", "MongoDB"],
      link: "#", // ใส่ลิงก์จริง
    },
    {
      title: "Health Rider",
      description:
        "A home-delivery medication service supporting Thailand’s “30 Baht Universal Healthcare” policy by enabling patients to conveniently receive prescribed medicines without the need to travel to hospitals.",
      image:
        "https://i.postimg.cc/G3WJDYYm/Screenshot-2025-10-11-122156.png?height=200&width=300", // เปลี่ยนเป็นรูปจริง
      tech: ["Vue.js", "Node.js", "MongoDB"],
      link: "#", // ใส่ลิงก์จริง
    },
    {
      title: "ERP Demo (Personal Project)",
      description:
        "Developed an enterprise management system covering employee management, KPI tracking, financial (income–expense) monitoring, task workflow management, and a centralized performance dashboard.",
      image:
        "https://i.postimg.cc/qvj31Ctq/Screenshot-2025-10-11-122341.png?height=200&width=300", // เปลี่ยนเป็นรูปจริง
      tech: ["Vue.js", "Golang", "MongoDB"],
      link: "#", // ใส่ลิงก์จริง
    },
    // เพิ่มโปรเจกต์ใหม่ได้ที่นี่
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      {/* =============================================
          Hero Section - หน้าแรก/หน้าหลัก
          ============================================= */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-20"
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* รูปโปรไฟล์/อวตาร */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 p-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="https://i.postimg.cc/htV6Zpfz/profile.jpg"
                  alt="Panupong Songsaksri Profile"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* ชื่อหลัก */}
          <TextAnimate>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Panupong Songsaksri {/* เปลี่ยนชื่อได้ที่นี่ */}
            </h1>
          </TextAnimate>

          {/* ข้อความพิมพ์ทีละตัว */}
          <div className="text-2xl md:text-3xl text-gray-600 mb-8 h-12">
            <TypingAnimation text="Web Developer Node.js & Golang Backend Specialist" />
            {/* เปลี่ยนข้อความได้ที่นี่ */}
          </div>

          {/* คำอธิบายตัวเอง */}
          <TextAnimate className="mb-12">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Web developer specializing in Node.js and Golang backends. I build
              scalable APIs and modern web apps with a focus on clean code,
              performance, and great user experience.
            </p>
          </TextAnimate>

          {/* ปุ่มและลิงก์โซเชียล */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* ปุ่มดาวน์โหลด Resume */}
            <a
              href="/resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all">
              <Download className="mr-2 h-5 w-5" />
              Download Resume {/* เปลี่ยนข้อความปุ่มได้ */}
              </Button>
            </a>

            {/* ไอคอนโซเชียล */}
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/Be2Bag" // ใส่ลิงก์ GitHub จริง
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all border border-gray-200"
              >
                <Github className="h-6 w-6 text-gray-700" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/panupong-songsaksri-7811a02a3/" // ใส่ลิงก์ LinkedIn จริง
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all border border-gray-200"
              >
                <Linkedin className="h-6 w-6 text-blue-600" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =============================================
          Skills Section - แสดงทักษะและความสามารถ
          ============================================= */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* หัวข้อ Skills */}
          <TextAnimate>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
              Skills & Technologies {/* เปลี่ยนหัวข้อได้ */}
            </h2>
          </TextAnimate>

          {/* Grid ของ Skill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <FloatingCard key={skill.name} delay={index * 0.1}>
                <Card className="h-full bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    {/* ไอคอนทักษะ */}
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${skill.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                    >
                      {skill.icon}
                    </div>
                    {/* ชื่อทักษะ */}
                    <h3 className="text-xl font-semibold text-gray-800">
                      {skill.name}
                    </h3>
                  </CardContent>
                </Card>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
          Projects Section - แสดงผลงาน/โปรเจกต์
          ============================================= */}
      <section
        id="projects"
        className="py-20 px-4 bg-gradient-to-r from-purple-50 to-blue-50"
      >
        <div className="max-w-6xl mx-auto">
          {/* หัวข้อ Projects */}
          <TextAnimate>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
              Featured Projects {/* เปลี่ยนหัวข้อได้ */}
            </h2>
          </TextAnimate>

          {/* Grid ของ Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <FloatingCard key={project.title} delay={index * 0.2}>
                <Card className="h-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group">
                  {/* รูปโปรเจกต์ */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Overlay เมื่อ hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* ไอคอนลิงก์ */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg"
                    >
                      <ExternalLink className="h-4 w-4 text-gray-700" />
                    </motion.div>
                  </div>

                  {/* ข้อมูลโปรเจกต์ */}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    {/* แท็กเทคโนโลยี */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
            Education Section - ระบบการศึกษา
            ============================================= */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* หัวข้อ Education */}
          <TextAnimate>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
              Education {/* เปลี่ยนหัวข้อได้ */}
            </h2>
          </TextAnimate>

          {/* Card การศึกษา */}
          <FloatingCard>
            <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl p-8 text-center">
              {/* ไอคอนหรือสัญลักษณ์ */}
              <div className="text-5xl text-purple-400 mb-4">🎓</div>
              {/* ข้อมูลการศึกษา */}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Bachelor of Science in Information Technology
              </h3>
              <p className="text-gray-700 mb-10">Silpakorn University</p>
              {/* <p className="text-gray-600 mb-4"></p> */}
              <p className="text-lg text-gray-700 leading-relaxed">
                Studied Information Technology with a focus on building scalable
                systems, backend development, and digital transformation.
                Developed practical skills through academic and real-world
                projects, emphasizing clean code, performance, and user
                experience.
                {/* ปรับแต่งรายละเอียดได้ที่นี่ */}
              </p>
            </Card>
          </FloatingCard>
        </div>
      </section>

      {/* =============================================
          Footer/Contact Section - ติดต่อและข้อมูลส่วนตัว
          ============================================= */}
      <footer
        id="contact"
        className="py-16 px-4 bg-gradient-to-r from-gray-900 to-purple-900 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* หัวข้อติดต่อ */}
          <TextAnimate>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Let&apos;s Work Together
            </h2>
            {/* เปลี่ยนหัวข้อได้ */}
          </TextAnimate>

          {/* ข้อความเชิญชวน */}
          <TextAnimate>
            <p className="text-lg mb-8 text-gray-300">
              Ready to bring your ideas to life? Let&apos;s create something
              amazing together.
              {/* เปลี่ยนข้อความได้ที่นี่ */}
            </p>
          </TextAnimate>

          {/* ข้อมูลติดต่อ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
          >
            {/* อีเมล */}
            <a
              href="mailto:dev.be2bag@gmail.com" // เปลี่ยนอีเมลจริง
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5" />
              dev.be2bag@gmail.com {/* เปลี่ยนอีเมลได้ */}
            </a>

            {/* เบอร์โทร */}
            <a
              href="tel:+1234567890" // เปลี่ยนเบอร์โทรจริง
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="h-5 w-5" />
              063 106 7421 {/* เปลี่ยนเบอร์โทรได้ */}
            </a>

            {/* ที่อยู่ */}
            <span className="flex items-center gap-2 text-gray-300">
              <MapPin className="h-5 w-5" />
              Bangkok, Thailand {/* เปลี่ยนที่อยู่ได้ */}
            </span>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="border-t border-gray-700 pt-8"
          >
            <p className="text-gray-400">
              © 2024 Panupong Songsaksri. All rights reserved.
            </p>
            {/* เปลี่ยนปีและชื่อได้ */}
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
