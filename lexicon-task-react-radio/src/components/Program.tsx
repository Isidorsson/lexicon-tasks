import '../styles/Program.css';

import { ChangeEvent, useEffect, useState } from 'react';

import { fetchData } from '../api/fetchData';

interface Pagination {
  page: number;
  size: number;
  totalhits: number;
  totalpages: number;
  nextpage: string;
}

interface SocialMediaPlatform {
  platform: string;
  platformurl: string;
}

interface ProgramCategory {
  id: string;
  name: string;
}

interface Channel {
  id: string;
  name: string;
}

interface Program {
  id: string;
  name: string;
  description: string;
  programcategory: ProgramCategory;
  payoff: string;
  broadcastinfo: string;
  email: string;
  phone: string;
  programurl: string;
  programimage: string;
  programimagetemplate: string;
  programimagewide: string;
  programimagetemplatewide: string;
  socialimage: string;
  socialimagetemplate: string;
  socialmediaplatforms: SocialMediaPlatform[];
  channel: Channel;
  archived: boolean;
  hasondemand: boolean;
  haspod: boolean;
  responsibleeditor: string;
}

interface Sr {
  copyright: string;
  pagination: Pagination;
  programs: Program[];
}
export const Program: React.FC = () => {
  const [programCategories, setProgramCategories] = useState<ProgramCategory[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = Number(event.target.value);
    console.log('Selected category:', selectedCategoryId);
    setSelectedCategoryId(selectedCategoryId);
  };


  useEffect(() => {
    const fetchProgramCategories = async () => {
      let page = 1;
      let totalPages = 1;
      let programCategories: ProgramCategory[] = [];

      while (page <= totalPages) {
        const { data, isLoading, error } = await fetchData(`programcategories?format=json&page=${page}`);

        // console.log('Data:', data);
        // console.log('Loading:', isLoading);
        // console.log('Error:', error);

        if (data) {
          programCategories = [...programCategories, ...data.programcategories];
          totalPages = data.pagination.totalpages;
        } else {
          setError('No program categories found');
        }

        setIsLoading(isLoading);
        if (error) {
          setError(error);
        }

        page++;
      }

      setProgramCategories(programCategories);
    };

    fetchProgramCategories();
  }, []);

  useEffect(() => {
    const fetchPrograms = async () => {
      if (selectedCategoryId !== null) {
        setIsLoading(true);
        try {
          const response = await fetch(`https://api.sr.se/api/v2/programs/index?programcategoryid=${selectedCategoryId}&format=json`);
          const data = await response.json();

          console.log(data);

          if (data) {
            setPrograms(data.programs);
          } else {
            setError('No programs found for this category');
          }

          setIsLoading(false);
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        }
      } else {
        setPrograms([]);
      }
    };

    fetchPrograms();
  }, [selectedCategoryId]);


  if (isLoading) {
    return (
      <div className="Program">
        <h2>Programs</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Program">
        <h2>Programs</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="Program">
      <h2>Programs</h2>
      <>
        <select value={selectedCategory?.id || ''} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {programCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <aside>
          <h2>Channels</h2>
          <ul>
            {programs.map((program) => (
              <li key={program.id}>
                <h3>{program.channel.name}</h3>
                <p>{program.description}</p>
                <img src={program.programimage} alt={program.name} />
              </li>
            ))}
          </ul>
        </aside>
      </>

    </div>
  );
};