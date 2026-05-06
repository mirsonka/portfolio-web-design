import type { FC } from 'react'
import type { TProject } from '../App'

interface IProjectCardProps {
  project: TProject
}

const ProjectCard: FC<IProjectCardProps> = ({ project }) => {
  const mainImage = project.images.find((img) => img.isMain)
  const doubleSizeImage = project.images.find((img) => img.isDoubleSize)
  const smallImages = project.images.filter(
    (img) => !img.isMain && !img.isDoubleSize,
  )
  const tripleRowImages = smallImages.slice(0, 3)
  const stackedImages = smallImages.slice(3, 5)

  return (
    <section
      id={`project-${project.id}`}
      className="w-full border-b border-white/30 px-5 py-16 sm:px-8 md:py-20"
    >
      {/* Grid: 3 rows */}
      <div className="mx-auto grid w-full max-w-[520px] gap-2 md:max-w-none md:gap-4">
        {/* Row 1: main image (50%) + description (50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          {/* Main image */}
          <div className="order-2 aspect-video overflow-hidden rounded-lg bg-neutral-800 transition-transform duration-300 ease-in-out hover:scale-102 md:order-1 md:aspect-auto">
            {mainImage?.src ? (
              <img
                src={mainImage.src}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-500">
                main image
              </div>
            )}
          </div>

          {/* Description block */}
          <div className="order-1 flex flex-col justify-between rounded-lg bg-neutral-900 p-6 md:order-2 md:p-8">
            {/* Top: year + link */}
            <div className="flex items-start justify-between">
              <span className="text-lg text-white">{project.year}</span>
              <a
                href={project.link}
                target="_blank"
                className="text-lg text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                смотреть проект ↗
              </a>
            </div>

            {/* Middle: title + description */}
            <div className="my-6 md:my-8">
              <h2 className="mb-4 font-['BebasNeue'] text-3xl uppercase md:mb-6 md:text-5xl lg:text-6xl">
                {project.title}
              </h2>
              <p className="text-lg leading-relaxed text-white">
                {project.description}
              </p>
            </div>

            {/* Bottom: tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`rounded-full border border-white px-4 py-1.5 text-lg ${tag.isMainTag ? 'bg-white text-black' : ''}`}
                >
                  {tag.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: three images, each 1/3 width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
          {tripleRowImages.map((img, index) => (
            <div
              key={index}
              className="aspect-video bg-neutral-800 rounded-lg overflow-hidden hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer"
            >
              {img.src ? (
                <img
                  src={img.src}
                  alt={`${project.title} image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-500">
                  image {index + 1}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Row 3: stacked images (1/3) + double-size image (2/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
          {/* Left column: 1/3 — either one merged image or two stacked */}
          {project.mergeStackedImages ? (
            <div className="bg-neutral-800 rounded-lg overflow-hidden hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer">
              {stackedImages[0]?.src ? (
                <img
                  src={stackedImages[0].src}
                  alt={`${project.title} screenshot 1`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-500">
                  screenshot 1
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-rows-2 gap-2 md:gap-4">
              {stackedImages.map((img, index) => (
                <div
                  key={index}
                  className="bg-neutral-800 rounded-lg overflow-hidden hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer"
                >
                  {img.src ? (
                    <img
                      src={img.src}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-500">
                      screenshot {index + 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Right column: 2/3 — double-size image */}
          <div className="md:col-span-2 bg-neutral-800 rounded-lg overflow-hidden hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer">
            {doubleSizeImage?.src ? (
              <img
                src={doubleSizeImage.src}
                alt={`${project.title} main screenshot`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-500">
                double-size image
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectCard
