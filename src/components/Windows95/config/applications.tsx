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

// Windows 95 style icons
const icons = {
  about: '👤',
  projects: '💼',
  contact: '📧',
  skills: '🎯',
  education: '🎓',
  blog: '📝',
  notepad: '📄',
  paint: '🎨',
  calculator: '🔢',
  games: '🎮',
  music: '🎵',
  browser: '🌐',
  cmd: '⌨️',
  word: '📝',
  excel: '📊'
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