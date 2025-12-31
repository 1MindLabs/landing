import { TeamMember } from "../types";

const teamData = [
  { name: "Areeb", role: "DevOps" },
  { name: "Shivansh", role: "Agentic AI" },
  { name: "Rishi", role: "App Dev" },
  { name: "Avantika", role: "Backend" },
  { name: "Yuktha", role: "AI/ML" },
  { name: "Anish", role: "CyberSec" },
  { name: "Ravikant", role: "AI/ML" },
  { name: "Hema", role: "Product" },
  { name: "Thendral", role: "Backend" },
  { name: "Alfiya", role: "Fullstack" },
  { name: "Hamad", role: "Web3" },
  { name: "Bhavana", role: "Backend" },
  { name: "Amar", role: "Analytics" },
  { name: "Arush", role: "Analytics" },
  { name: "Devansh", role: "Frontend" },
  { name: "Somnath", role: "Backend" },
  { name: "Shashwat", role: "Frontend" },
  { name: "Shirish", role: "Fullstack" },
  { name: "Vishesh", role: "AI/ML" },
  { name: "Mohit", role: "Fullstack" },
  { name: "Taha", role: "Cybersec" },
  { name: "Akash", role: "DevOps" },
  { name: "Abhyuday", role: "MLOps" },
  { name: "Ahana", role: "Backend" },
];

export const team: TeamMember[] = teamData.map((member, index) => {
  const getImageUrl = (name: string) => {
    if (name === "Areeb") return "/images/team/areeb.jpg";
    if (name === "Shivansh") return "/images/team/shivansh.jpeg";
    if (name === "Rishi") return "/images/team/rishi.jpeg";
    if (name === "Avantika") return "/images/team/avantika.jpeg";
    if (name === "Yuktha") return "/images/team/yuktha.jpeg";
    if (name === "Anish") return "/images/team/anish.jpeg";
    if (name === "Ravikant") return "/images/team/ravikant.jpeg";
    if (name === "Thendral") return "/images/team/thendral.jpeg";
    if (name === "Amar") return "/images/team/amar.jpg";
    if (name === "Arush") return "/images/team/arush.jpeg";
    if (name === "Devansh") return "/images/team/devansh.jpeg";
    if (name === "Somnath") return "/images/team/somnath.png";
    if (name === "Shashwat") return "/images/team/shashwat.jpg";
    if (name === "Mohit") return "/images/team/mohit.jpeg";
    if (name == "Vishesh") return "/images/team/vishesh.jpeg";
    return `https://picsum.photos/seed/${name}/400`;
  };

  const getSocialLinks = (name: string) => {
    const links: { linkedinUrl: string; githubUrl: string; email: string } = {
      linkedinUrl: "",
      githubUrl: "",
      email: "",
    };

    if (name === "Areeb") {
      links.linkedinUrl = "https://linkedin.com/in/areebahmeddd";
      links.githubUrl = "https://github.com/areebahmeddd";
      links.email = "mailto:areebahmed0709@gmail.com";
    }
    if (name === "Shivansh") {
      links.linkedinUrl = "https://linkedin.com/in/shivansh-karan";
      links.githubUrl = "https://github.com/spacetesla";
      links.email = "mailto:shivansh.karan@gmail.com";
    }
    if (name === "Rishi") {
      links.linkedinUrl = "https://linkedin.com/in/rishiraj-chirchi";
      links.githubUrl = "https://github.com/rishichirchi";
      links.email = "mailto:rishiraj.chirchi@gmail.com";
    }
    if (name === "Avantika") {
      links.linkedinUrl = "https://linkedin.com/in/avantika-kesarwani";
      links.githubUrl = "https://github.com/avii09";
      links.email = "mailto:avikesar2013@gmail.com";
    }
    if (name === "Yuktha") {
      links.linkedinUrl = "https://linkedin.com/in/yuktha-p-s";
      links.githubUrl = "https://github.com/psyuktha";
      links.email = "mailto:psyuktha@gmail.com";
    }
    if (name === "Anish") {
      links.linkedinUrl = "https://linkedin.com/in/danishvarma";
      links.githubUrl = "https://github.com/av7danger";
      links.email = "mailto:anishvarma.ava@gmail.com";
    }
    if (name === "Ravikant") {
      links.linkedinUrl = "https://linkedin.com/in/ravikant-saraf";
      links.githubUrl = "https://github.com/ravikant2003";
      links.email = "mailto:ravikantsaraf03@gmail.com";
    }
    if (name === "Hema") {
      links.linkedinUrl = "https://linkedin.com/in/hemamalini-srinivas";
      links.githubUrl = "https://github.com/hemamalinii";
      links.email = "mailto:hemamalinisrinivas2004@gmail.com";
    }
    if (name === "Thendral") {
      links.linkedinUrl = "https://linkedin.com/in/thendral-kabilan";
      links.githubUrl = "https://github.com/kthendral";
      links.email = "mailto:thendralkabilan248@gmail.com";
    }
    if (name === "Alfiya") {
      links.linkedinUrl = "https://linkedin.com/in/alfiyafatima09";
      links.githubUrl = "https://github.com/alfiyafatima09";
      links.email = "mailto:alfiyafatima200431@gmail.com";
    }
    if (name === "Hamad") {
      links.linkedinUrl = "https://linkedin.com/in/therealhamad";
      links.githubUrl = "https://github.com/therealhamad";
      links.email = "mailto:hamadkkr3@hotmail.com";
    }
    if (name === "Bhavana") {
      links.linkedinUrl = "https://linkedin.com/in/bhavana-subramani";
      links.githubUrl = "https://github.com/bhaaaav";
      links.email = "mailto:esection41@gmail.com";
    }
    if (name === "Amar") {
      links.linkedinUrl = "https://linkedin.com/in/amartya-anand07";
      links.githubUrl = "https://github.com/amarr07";
      links.email = "mailto:amartyaanand07@gmail.com";
    }
    if (name === "Arush") {
      links.linkedinUrl = "https://linkedin.com/in/arush3218";
      links.githubUrl = "https://github.com/arush3218";
      links.email = "mailto:arush3218@gmail.com";
    }
    if (name === "Devansh") {
      links.linkedinUrl = "https://linkedin.com/in/devansh-aryan";
      links.githubUrl = "https://github.com/devansharyan123";
      links.email = "mailto:devansh123aryan@gmail.com";
    }
    if (name === "Somnath") {
      links.linkedinUrl = "https://linkedin.com/in/somnath-umapathi-9a485a205";
      links.githubUrl = "https://github.com/somnathumapathi";
      links.email = "mailto:somnathumapathi7@gmail.com";
    }
    if (name === "Shashwat") {
      links.linkedinUrl = "https://linkedin.com/in/shashwatkumar-";
      links.githubUrl = "https://github.com/shashwat6204";
      links.email = "";
    }
    if (name === "Shirish") {
      links.linkedinUrl = "https://linkedin.com/in/shirish2003";
      links.githubUrl = "";
      links.email = "mailto:shirishk2003@gmail.com";
    }
    if (name === "Vishesh") {
      links.linkedinUrl =
        "https://linkedin.com/in/vishesh-kumar-gautam-206216290";
      links.githubUrl = "https://github.com/vishesh-1111";
      links.email = "mailto:visheshkumargautam19@gmail.com";
    }
    if (name === "Mohit") {
      links.linkedinUrl = "https://linkedin.com/in/mohit-nagaraj";
      links.githubUrl = "https://github.com/mohit-nagaraj";
      links.email = "mailto:mohitnagaraj20@gmail.com";
    }
    if (name === "Taha") {
      links.linkedinUrl = "https://linkedin.com/in/taha-Zakir";
      links.githubUrl = "https://github.com/mtzakir";
      links.email = "mailto:mtzakir@gmail.com";
    }

    return links;
  };

  const socialLinks = getSocialLinks(member.name);

  return {
    id: index + 1,
    name: member.name,
    role: member.role,
    imageUrl: getImageUrl(member.name),
    linkedinUrl: socialLinks.linkedinUrl,
    githubUrl: socialLinks.githubUrl,
    email: socialLinks.email,
  };
});
