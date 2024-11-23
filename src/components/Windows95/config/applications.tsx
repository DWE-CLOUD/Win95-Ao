import { AboutContent } from "../windows/AboutContent";
import { ProjectsContent } from "../windows/ProjectsContent";
import { ContactContent } from "../windows/ContactContent";
import { SkillsContent } from "../windows/SkillsContent";
import { EducationContent } from "../windows/EducationContent";
import { BlogContent } from "../windows/BlogContent";
import { NotepadContent } from "../windows/NotepadContent";
import { PaintContent } from "../windows/PaintContent";
import { CalculatorContent } from "../windows/CalculatorContent";
import { GamesContent } from "../windows/GamesContent";
import { MusicPlayerContent } from "../windows/MusicPlayerContent";
import { WebBrowserContent } from "../windows/WebBrowserContent";
import { CommandPromptContent } from "../windows/CommandPromptContent";
import { WordContent } from "../windows/WordContent";
import { ExcelContent } from "../windows/ExcelContent";

{/* Redundant Imports but will optimize later */}
import About from "./win95ico/all/Agent.ico";
import Projects from "./win95ico/all/Briefcase.ico";
import Contact from "./win95ico/all/Mailbox.ico";
import Skills from "./win95ico/all/Settings.ico";
import Education from "./win95ico/all/Book.ico";
import Blogs from "./win95ico/all/Tablet Write.ico";
import Notepad from "./win95ico/all/notepad.ico";
import Paint from "./win95ico/all/paint.ico";
import Calci from "./win95ico/all/Calculator.ico";
import Game from "./win95ico/all/Plush bear.ico";
import Musics from "./win95ico/all/Music Disc.ico";
import Browsers from "./win95ico/all/Earth (4 colors).ico";
import Com from "./win95ico/all/MS-DOS logo.ico";
import Wor from "./win95ico/all/WordPad.ico";
import Ex from "./win95ico/all/Text field sheet.ico";
{/* Sorry for this big import */}


const icons = {
  about: About,
  projects: Projects,
  contact: Contact,
  skills: Skills,
  education: Education,
  blog: Blogs,
  notepad: Notepad,
  paint: Paint,
  calculator: Calci,
  games: Game,
  music: Musics,
  browser: Browsers,
  cmd: Com,
  word: Wor,
  excel: Ex
};


export const applications = {
  about: {
    title: "About Me - Resume.exe",
    icon: icons.about,
    content: AboutContent
  },
  projects: {
    title: "My Projects - Portfolio.exe",
    icon: icons.projects,
    content: ProjectsContent
  },
  contact: {
    title: "Contact - Mail.exe",
    icon: icons.contact,
    content: ContactContent
  },
  skills: {
    title: "Skills - Skills.exe",
    icon: icons.skills,
    content: SkillsContent
  },
  education: {
    title: "Education - Academic.exe",
    icon: icons.education,
    content: EducationContent
  },
  blog: {
    title: "Blog - Blog.exe",
    icon: icons.blog,
    content: BlogContent
  },
  notepad: {
    title: "Notepad.exe",
    icon: icons.notepad,
    content: NotepadContent
  },
  paint: {
    title: "Paint",
    icon: icons.paint,
    content: PaintContent
  },
  calculator: {
    title: "Calculator",
    icon: icons.calculator,
    content: CalculatorContent
  },
  games: {
    title: "Games",
    icon: icons.games,
    content: GamesContent
  },
  music: {
    title: "Media Player",
    icon: icons.music,
    content: MusicPlayerContent
  },
  browser: {
    title: "Internet Explorer",
    icon: icons.browser,
    content: WebBrowserContent
  },
  cmd: {
    title: "MS-DOS Prompt",
    icon: icons.cmd,
    content: CommandPromptContent
  },
  word: {
    title: "Microsoft Word",
    icon: icons.word,
    content: WordContent
  },
  excel: {
    title: "Microsoft Excel",
    icon: icons.excel,
    content: ExcelContent
  }
} as const;