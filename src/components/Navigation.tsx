import type { FC } from 'react'
import type { TProject } from '../App'

interface INavigationProps {
  projects: TProject[]
  visibleProjectIds: Set<number>
  isCarouselVisible: boolean
}

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (!section) return

  const startY = window.scrollY
  const targetY = section.getBoundingClientRect().top + startY
  const distance = targetY - startY
  const duration = 350
  const startTime = performance.now()

  const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3)

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    window.scrollTo({
      top: startY + distance * easeOutCubic(progress),
      behavior: 'instant',
    })

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
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
            onClick={(event) => {
              event.preventDefault()
              scrollToSection(`project-${project.id}`)
            }}
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
        onClick={(event) => {
          event.preventDefault()
          scrollToSection('carousel')
        }}
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
