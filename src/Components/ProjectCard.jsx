import React from "react";

function ProjectCard({ imageUrl, title, objective, impact }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 m-3 p-3 sm:p-4 bg-primary-light dark:bg-card rounded-xl shadow-md dark:shadow-black/50 hover:shadow-lg dark:hover:shadow-stone-900/70 transition-transform hover:scale-[1.01] border dark:border-muted">
      {/* Left Image */}
      <div className="w-full md:w-1/2">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-44 sm:h-56 md:h-64 object-cover rounded-lg"
          loading="lazy"
        />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-7/12 bg-card dark:bg-card rounded-lg shadow dark:shadow-black/50 p-3 sm:p-4 border dark:border-muted">
        <h3 className="text-lg sm:text-xl font-bold text-primary dark:text-secondary mb-2">
          {title}
        </h3>

        <div className="space-y-2 text-sm sm:text-base leading-relaxed">
          <div>
            <p className="font-semibold text-gray-900 dark:text-foreground">Objective:</p>
            <p className="text-gray-700 dark:text-muted">{objective}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-foreground">Impact:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-muted">
              {impact.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
           
          </div>
           
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
