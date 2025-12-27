import { CVData } from '@/types/cv';
import { PersonalInfoEditor } from './PersonalInfoEditor';
import { SummaryEditor } from './SummaryEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { EducationEditor } from './EducationEditor';
import { SkillsEditor } from './SkillsEditor';
import { LanguagesEditor } from './LanguagesEditor';

interface EditorPanelProps {
  cvData: CVData;
  updateCVData: (data: Partial<CVData>) => void;
}

export function EditorPanel({ cvData, updateCVData }: EditorPanelProps) {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <PersonalInfoEditor
            data={cvData.personalInfo}
            onChange={(personalInfo) => updateCVData({ personalInfo })}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <SummaryEditor
            data={cvData.summary}
            onChange={(summary) => updateCVData({ summary })}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <ExperienceEditor
            data={cvData.experience}
            onChange={(experience) => updateCVData({ experience })}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <EducationEditor
            data={cvData.education}
            onChange={(education) => updateCVData({ education })}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <SkillsEditor
            data={cvData.skills}
            onChange={(skills) => updateCVData({ skills })}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <LanguagesEditor
            data={cvData.languages}
            onChange={(languages) => updateCVData({ languages })}
          />
        </div>
      </div>
    </div>
  );
}
