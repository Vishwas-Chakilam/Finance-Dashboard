import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Github, Linkedin, Mail } from "lucide-react";

const DeveloperCard = () => {
  return (
    <Card className="border-0 bg-card/70 shadow-sm">
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">VC</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold leading-tight">Vishwas Chakilam</p>
          <p className="text-xs text-muted-foreground">Frontend Developer • Finance Dashboard Demo</p>
          <div className="mt-1 flex flex-wrap gap-3 text-xs">
            <a href="mailto:vishwas.chakilam@gmail.com" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <Mail className="h-3.5 w-3.5" />
              <span>vishwas.chakilam@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/vishwas-chakilam"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>linkedin.com/in/vishwas-chakilam</span>
            </a>
            <a
              href="https://github.com/vishwas-chakilam"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              <span>github.com/vishwas-chakilam</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeveloperCard;
