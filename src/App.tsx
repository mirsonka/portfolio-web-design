import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import ProjectCard from './components/ProjectCard'
import Carousel from './components/Carousel'
import type { ICarouselCard } from './components/Carousel'
import ButtonWithHover from './components/ButtonWithHover'

type TProjectImage = {
  src: string
  isMain?: boolean
  isDoubleSize?: boolean
}

type TProjectTag = {
  id: number
  title: string
  isMainTag?: boolean
}

export type TProject = {
  id: number
  title: string
  year: number
  description: string
  tags: TProjectTag[]
  link: string
  images: TProjectImage[]
  mergeStackedImages?: boolean
}

const PROJECTS: TProject[] = [
  {
    id: 1,
    title: 'Petshop',
    year: 2025,
    description:
      'Проект представляет собой онлайн-магазин для подбора и покупки питомцев.',
    tags: [
      {
        id: 1,
        isMainTag: true,
        title: 'ui/ux',
      },
      {
        id: 2,
        title: 'брендинг',
      },
      {
        id: 3,
        title: 'mobile',
      },
    ],
    link: 'https://hsedesign.ru/project/dizajn-mobilnogo-prilozheniya-bcea8fd66b1b4f56a8287ed01764faef',
    images: [
      {
        src: 'src/assets/project-1/главная (сверху).png',
        isMain: true,
      },
      {
        src: 'src/assets/project-1/большая 2.png',
        isDoubleSize: true,
      },
      {
        src: 'src/assets/project-1/чуть ниже верхней.png',
      },
      {
        src: 'src/assets/project-1/правее.png',
      },
      {
        src: 'src/assets/project-1/правее2.png',
      },
      {
        src: 'src/assets/project-1/ниже.png',
      },
      {
        src: 'src/assets/project-1/ниже2.png',
      },
    ],
  },
  {
    id: 2,
    title: 'MURR',
    year: 2026,
    description: 'Интерактивный веб-плакат с веселыми мини играми.',
    mergeStackedImages: true,
    tags: [
      {
        id: 1,
        isMainTag: true,
        title: 'веб-плакат',
      },
      {
        id: 2,
        title: 'код',
      },
      {
        id: 3,
        title: 'ui/ux',
      },
    ],
    link: 'https://hsedesign.ru/project/veb-plakat-3cf193a884dd4e8e907917c3fb68f04e',
    images: [
      {
        src: 'src/assets/project-2/обложка.png',
        isMain: true,
      },
      {
        src: 'src/assets/project-2/большая.png',
        isDoubleSize: true,
      },
      {
        src: 'src/assets/project-2/кошка.png',
      },
      {
        src: 'src/assets/project-2/справа .png',
      },
      {
        src: 'src/assets/project-2/справа 2.png',
      },
      {
        src: 'src/assets/project-2/снизу.png',
      },
      {
        src: '',
      },
    ],
  },
]

const CAROUSEL_CARDS: ICarouselCard[] = [
  {
    id: 1,
    title: 'MURR',
    description:
      'Лендинг для благотворительного мероприятия в поддержку животных',
    tags: [
      {
        id: 1,
        isMainTag: true,
        title: 'лендинг',
      },
      {
        id: 2,
        title: 'код',
      },

      {
        id: 3,
        title: 'ui/ux',
      },
    ],
    images: [
      {
        src: 'src/assets/slider-project-1/1.png',
        isMain: true,
      },
      {
        src: 'src/assets/slider-project-1/2.png',
        isDoubleSize: true,
      },
      {
        src: 'src/assets/slider-project-1/3.png',
      },
      {
        src: 'src/assets/slider-project-1/4.png',
      },
    ],
  },
  {
    id: 2,
    title: 'Yuno',
    description:
      'Приложение для поиска культурных маршрутов по золотому кольцу России.',
    tags: [
      {
        id: 1,
        isMainTag: true,
        title: 'mobile design',
      },
      {
        id: 2,
        title: 'ui/ux',
      },
    ],
    images: [
      {
        src: 'src/assets/slider-project-2/1.png',
        isMain: true,
      },
      {
        src: 'src/assets/slider-project-2/2.png',
        isDoubleSize: true,
      },
      {
        src: 'src/assets/slider-project-2/3.png',
      },
      {
        src: 'src/assets/slider-project-2/4.png',
      },
    ],
  },
  {
    id: 3,
    title: 'Потолки',
    description:
      'Сайт для монтажа подвесных потолков и других строительных работ.',
    tags: [
      {
        id: 1,
        isMainTag: true,
        title: 'web',
      },
      {
        id: 2,
        title: 'ui/ux',
      },
      {
        id: 3,
        title: 'tilda',
      },
    ],
    images: [
      {
        src: 'src/assets/slider-project-3/1.png',
        isMain: true,
      },
      {
        src: 'src/assets/slider-project-3/2.png',
        isDoubleSize: true,
      },
      {
        src: 'src/assets/slider-project-3/3.png',
      },
      {
        src: 'src/assets/slider-project-3/4.png',
      },
    ],
  },
]

function App() {
  const [visibleProjectIds, setVisibleProjectIds] = useState<Set<number>>(
    new Set(),
  )
  const [isCarouselVisible, setIsCarouselVisible] = useState(false)

  useEffect(() => {
    const projectSections = PROJECTS.map((p) =>
      document.getElementById(`project-${p.id}`),
    ).filter(Boolean) as HTMLElement[]

    const carouselSection = document.getElementById('carousel') as HTMLElement

    const allSections = [
      ...projectSections,
      ...(carouselSection ? [carouselSection] : []),
    ]

    if (allSections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleProjectIds((prev) => {
          const next = new Set(prev)
          for (const entry of entries) {
            if (entry.target.id === 'carousel') {
              setIsCarouselVisible(entry.isIntersecting)
            } else {
              const id = Number(entry.target.id.replace('project-', ''))
              if (entry.isIntersecting) {
                next.add(id)
              } else {
                next.delete(id)
              }
            }
          }
          return next
        })
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: '0px',
      },
    )

    allSections.forEach((section) => observer.observe(section))

    return () => {
      allSections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return (
    <div className="flex bg-black text-white">
      <Navigation
        projects={PROJECTS}
        visibleProjectIds={visibleProjectIds}
        isCarouselVisible={isCarouselVisible}
      />
      <div className="flex-1 min-w-0">
        <div
          id="screen-1"
          className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black text-white"
        >
          <p className="absolute left-5 right-5 top-6 text-right text-[14px] font-normal leading-none text-white sm:right-8 sm:text-[16px] md:left-auto md:right-12 md:top-8 lg:right-16 lg:text-[18px]">
            Мешавкина Алина / 2026
          </p>

          {/* Center content */}
          <div className="flex flex-1 flex-col items-center justify-center gap-1 px-5 pt-12 sm:px-8 md:items-start md:px-12 lg:px-16">
            <h1 className="w-full text-center font-['BebasNeue'] text-[5.1rem] uppercase leading-none sm:text-[7rem] md:text-left md:text-[11rem] lg:text-[13rem]">
              ПОРТФОЛИО
            </h1>
            <h2 className="w-full text-center font-montserrat text-base font-normal uppercase tracking-[0.16em] text-white sm:text-lg md:text-left md:text-2xl md:tracking-widest lg:text-3xl">
              UI/UX & PRODUCT DESIGNER
            </h2>
            <div className="mt-12 flex w-full max-w-[340px] flex-col gap-4 sm:mt-16 sm:max-w-none sm:flex-row sm:gap-8 lg:mt-20 lg:gap-20">
              <ButtonWithHover
                onClick={() => window.open('https://t.me/mirsonka', '_blank')}
              >
                связаться со мной
              </ButtonWithHover>
              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById('project-1')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="h-14 w-full rounded-[30px] border border-white bg-transparent p-0 text-base font-normal text-white transition-colors duration-500 ease-in-out hover:cursor-pointer hover:border-[#B08AE8] sm:w-55 sm:text-lg"
              >
                смотреть работы
              </button>
            </div>
          </div>
        </div>
        <div className="screen-2 h-fit min-w-0 flex flex-col gap-0 md:mr-20">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <Carousel cards={CAROUSEL_CARDS} />
        </div>
      </div>
    </div>
  )
}

export default App
