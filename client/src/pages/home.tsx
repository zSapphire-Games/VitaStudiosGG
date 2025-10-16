import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import projectImage1 from "@assets/generated_images/HighresScreenshot00001.png";
import projectImage2 from "@assets/generated_images/20251016_1427_Video Game Sunset Scene_remix_01k7nyhxpmejkbxkwpnsk0wd71.jpg";
import logoImage from "@assets/LOGO VITA_1760595346882.png";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  isFounder: boolean;
  /** Update to your actual path, e.g. /team/lukas.jpg or an imported asset */
  imageUrl?: string;
};

const projects = [
  {
    id: "1",
    title: "A Better Tomorrow",
    description: "An epic superhero adventure game.",
    imageUrl: projectImage1,
    fullDescription:
      "An epic adventure set in todays America, where humanity's last hope rests in the hands of those willing to fight for change. Experience a narrative-driven journey through breathtaking environments, complex moral choices, and unforgettable characters.",
    genre: "Superhero Game",
    platforms: "PC",
    releaseDate: "2027",
  },
  {
    id: "2",
    title: "Nomadic Adventures",
    description: "Explore beaches, bars, and working from paradise in this enchanting fantasy journey",
    imageUrl: projectImage2,
    fullDescription:
      "Embark on a magical quest through Asian cities lost to time. Uncover forgotten secrets, solve puzzles, while also running a beach bar on the side. Employ others, travel, or work yourself, the choice is yours.",
    genre: "Fantasy Adventure",
    platforms: "PC",
    releaseDate: "2028",
  },
];

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Lukas Sandvik",
    role: "Creative Director",
    bio: "Businessman & Game Designer",
    isFounder: true,
    imageUrl: "https://i.ibb.co/s9kbf7rR/lukas.jpg",
  },
  {
    id: "2",
    name: "Aaron",
    role: "Chief Executive Officer",
    bio: "Script Writing & Creative Planning",
    isFounder: true,
    imageUrl: "https://i.ibb.co/qF7x8ps3/aaron.jpg",
  },
  {
    id: "3",
    name: "Nick Kiafas",
    role: "Project Director",
    bio: "Programming and World Building",
    isFounder: true,
    imageUrl: "https://i.ibb.co/7xQVMBnF/nick.jpg",
  },
  {
    id: "4",
    name: "Maddox Holt",
    role: "Audio Designer",
    bio: "Proficient in Music & Sound Design",
    isFounder: false,
    imageUrl: "/team/maddox.jpg",
  },
  {
    id: "5",
    name: "BatCat",
    role: "3D Modeler",
    bio: "3D Modeling and Visual Design",
    isFounder: false,
    imageUrl: "/team/batcat.jpg",
  },
  {
    id: "6",
    name: "MrKool",
    role: "Project Director & Artist",
    bio: "Concept art and marketing material",
    isFounder: false,
    imageUrl: "/team/mrkool.jpg",
  },
  {
    id: "7",
    name: "Chris",
    role: "Composer and Script Writer",
    bio: "Creating atmospheric soundscapes",
    isFounder: false,
    imageUrl: "/team/chris.jpg",
  },
  {
    id: "8",
    name: "Breadley",
    role: "Graphics Designer",
    bio: "Video Editing & Writing",
    isFounder: false,
    imageUrl: "/team/breadley.jpg",
  },
  {
    id: "9",
    name: "Avensin",
    role: "3D Modeler",
    bio: "3D Modeling and Texturing",
    isFounder: false,
    imageUrl: "/team/avensin.jpg",
  },
];

function HeroSection() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute top-6 left-6 md:top-8 md:left-12 z-20">
        <img
          src={logoImage}
          alt="Vita Studios Logo"
          className="h-12 w-12 md:h-16 md:w-16"
          data-testid="img-logo"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground tracking-tight mb-6"
          data-testid="text-hero-title"
        >
          Vita Studios
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground mb-8"
          data-testid="text-hero-tagline"
        >
          Crafting worlds beyond imagination
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            We are an independent creative studio dedicated to developing
            story-driven games that push the boundaries of interactive
            entertainment.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Founded by industry veterans with a shared passion for meaningful
            narratives, we believe in creating experiences that resonate long
            after the credits roll.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FeaturedProjectSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12"
      data-testid="section-featured"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="max-w-prose">
            <h2
              className="text-4xl md:text-5xl font-semibold text-foreground mb-6"
              data-testid="text-featured-heading"
            >
              A Better Tomorrow
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              An epic superhero adventure set in modern day America where
              humanity's last hope rests in the hands of those willing to fight
              for change.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience a narrative-driven journey through breathtaking
              environments, complex moral choices, and unforgettable characters.
            </p>
          </div>
          <div>
            <img
              src={projectImage1}
              alt="A Better Tomorrow game scene"
              className="w-full rounded-lg shadow-md"
              data-testid="img-featured-project"
            />
          </div>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto mt-20">
        <div className="h-px bg-border" />
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      className="cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
      data-testid={`card-project-${project.id}`}
    >
      <motion.div
        className="relative w-full aspect-video preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="relative overflow-hidden h-full transition-all duration-300 ease-out hover:shadow-lg rounded-lg">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
              <h3
                className="text-2xl md:text-3xl font-semibold text-white mb-2"
                data-testid={`text-project-title-${project.id}`}
              >
                {project.title}
              </h3>
              <p
                className="text-white/90 text-sm md:text-base"
                data-testid={`text-project-description-${project.id}`}
              >
                {project.description}
              </p>
              <p className="text-white/70 text-xs md:text-sm mt-3">
                Click to learn more
              </p>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="h-full bg-card border border-card-border rounded-lg p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              {project.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
              {project.fullDescription}
            </p>
            <div className="space-y-2 text-sm md:text-base">
              <p className="text-foreground">
                <span className="font-semibold">Genre:</span> {project.genre}
              </p>
              <p className="text-foreground">
                <span className="font-semibold">Platforms:</span>{" "}
                {project.platforms}
              </p>
              <p className="text-foreground">
                <span className="font-semibold">Release:</span>{" "}
                {project.releaseDate}
              </p>
            </div>
            <p className="text-muted-foreground text-xs md:text-sm mt-6">
              Click to go back
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12"
      data-testid="section-projects"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        <h2
          className="text-4xl md:text-5xl font-semibold text-foreground mb-12 text-center"
          data-testid="text-projects-heading"
        >
          Our Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const founders = teamMembers.filter((member) => member.isFounder);
  const developers = teamMembers.filter((member) => !member.isFounder);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("");
  };

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12 bg-accent/30"
      data-testid="section-team"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        <h2
          className="text-4xl md:text-5xl font-semibold text-foreground mb-16 text-center"
          data-testid="text-team-heading"
        >
          Meet Our Team
        </h2>

        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Founders
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
            {founders.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className="flex flex-col items-center text-center"
                data-testid={`card-team-${member.id}`}
              >
                <Avatar className="w-[160px] h-[160px] shadow-sm mb-4">
                  {member.imageUrl ? (
                    <AvatarImage
                      src={member.imageUrl}
                      alt={member.name}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-accent text-3xl font-semibold text-muted-foreground">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <h4
                  className="text-base font-semibold text-foreground mb-1"
                  data-testid={`text-team-name-${member.id}`}
                >
                  {member.name}
                </h4>
                <p
                  className="text-sm text-muted-foreground mb-2"
                  data-testid={`text-team-role-${member.id}`}
                >
                  {member.role}
                </p>
                <p
                  className="text-sm text-muted-foreground"
                  data-testid={`text-team-bio-${member.id}`}
                >
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Development Team
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 justify-items-center">
            {developers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.8,
                  delay: 0.45 + index * 0.1,
                  ease: "easeOut",
                }}
                className="flex flex-col items-center text-center"
                data-testid={`card-team-${member.id}`}
              >
                <Avatar className="w-[120px] h-[120px] shadow-sm mb-3">
                  {member.imageUrl ? (
                    <AvatarImage
                      src={member.imageUrl}
                      alt={member.name}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-accent text-xl font-semibold text-muted-foreground">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <h4
                  className="text-base font-semibold text-foreground mb-1"
                  data-testid={`text-team-name-${member.id}`}
                >
                  {member.name}
                </h4>
                <p
                  className="text-sm text-muted-foreground mb-2"
                  data-testid={`text-team-role-${member.id}`}
                >
                  {member.role}
                </p>
                <p
                  className="text-sm text-muted-foreground"
                  data-testid={`text-team-bio-${member.id}`}
                >
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    mutation.mutate(data);
  };

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12"
      data-testid="section-contact"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-lg mx-auto"
      >
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-semibold text-foreground mb-4"
            data-testid="text-contact-heading"
          >
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Interested in collaborating or learning more about our work?
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <Label
              htmlFor="name"
              className="text-sm text-muted-foreground mb-2 block"
            >
              Name
            </Label>
            <Input
              id="name"
              {...form.register("name")}
              className="border-border focus:border-celestial transition-colors"
              data-testid="input-name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-sm text-muted-foreground mb-2 block"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              className="border-border focus:border-celestial transition-colors"
              data-testid="input-email"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="message"
              className="text-sm text-muted-foreground mb-2 block"
            >
              Message
            </Label>
            <Textarea
              id="message"
              {...form.register("message")}
              rows={5}
              className="border-border focus:border-celestial transition-colors resize-none"
              data-testid="input-message"
            />
            {form.formState.errors.message && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-celestial text-white"
            disabled={mutation.isPending}
            data-testid="button-submit-contact"
          >
            {mutation.isPending ? (
              "Sending..."
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturedProjectSection />
      <ProjectsSection />
      <TeamSection />
      <ContactSection />

      <footer className="py-8 px-6 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vita Studios. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}


