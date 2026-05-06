import type { FC } from 'react'
import type { TProject } from '../App'

interface INavigationProps {
  projects: TProject[]
  visibleProjectIds: Set<number>
  isCarouselVisible: boolean
}

const Navigation: FC<INavigationProps> = ({
  projects,
  visibleProjectIds,
  isCarouselVisible,
}) => {
  return (
    <section className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-center gap-2 px-8 md:flex">
      {projects.map((project) => {
        const isActive = visibleProjectIds.has(project.id)
        return (
          <a
            key={project.id}
            href={`#project-${project.id}`}
            className={`text-lg transition-colors duration-300 ${
              isActive
                ? 'text-white font-semibold'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {project.title}
          </a>
        )
      })}
      <a
        href="#carousel"
        className={`text-lg transition-colors duration-300 ${
          isCarouselVisible
            ? 'text-white font-semibold'
            : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        еще проекты
      </a>
    </section>
  )
}

export default Navigation
