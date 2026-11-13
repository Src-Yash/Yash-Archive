import { VideoCutIntro } from "@/components/VideoCutIntro";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { EditorialInterlude } from "@/components/ui/EditorialInterlude";
import { Journey } from "@/components/sections/Journey";
import { VisualArchive } from "@/components/sections/VisualArchive";
import { Mind } from "@/components/sections/Mind";
import { Now } from "@/components/sections/Now";
import { Exit } from "@/components/sections/Exit";

export default function Home() {
  return (
    <>
      <VideoCutIntro />
      <Hero />
      <Manifesto />
      <SelectedWork />
      <EditorialInterlude
        quote="Every piece of software is an argument about what deserves someone's attention."
        annotation="jotted in a margin after refactoring an entire weekend's UI down to three lines"
        bleedWord="UNFINISHED"
      />
      <Journey />
      <VisualArchive />
      <Mind />
      <Now />
      <Exit />
    </>
  );
}
