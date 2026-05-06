import type { FC, TransitionEvent } from 'react'
import { useEffect, useState } from 'react'

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

export interface ICarouselCard {
  id: number
  title: string
  description: string
  tags: TProjectTag[]
  images: TProjectImage[]
  mergeStackedImages?: boolean
}

interface ICarouselProps {
  cards?: ICarouselCard[]
}

const Carousel: FC<ICarouselProps> = ({ cards = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [trackIndex, setTrackIndex] = useState(cards.length > 1 ? 1 : 0)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true)
  const [isSliding, setIsSliding] = useState(false)

  const hasMultipleCards = cards.length > 1
  const renderedCards = hasMultipleCards
    ? [cards[cards.length - 1], ...cards, cards[0]]
    : cards

  useEffect(() => {
    setCurrentIndex(0)
    setIsTransitionEnabled(false)
    setTrackIndex(cards.length > 1 ? 1 : 0)

    const frameId = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [cards.length])

  const goToPrevious = () => {
    if (!hasMultipleCards || isSliding) return

    setIsSliding(true)
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1))
    setTrackIndex((prev) => prev - 1)
  }

  const goToNext = () => {
    if (!hasMultipleCards || isSliding) return

    setIsSliding(true)
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1))
    setTrackIndex((prev) => prev + 1)
  }

  const goToSlide = (index: number) => {
    if (index === currentIndex || isSliding) return

    setIsSliding(hasMultipleCards)
    setCurrentIndex(index)
    setTrackIndex(hasMultipleCards ? index + 1 : index)
  }

  const handleTrackTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return

    setIsSliding(false)

    if (!hasMultipleCards) return

    if (trackIndex === 0) {
      setIsTransitionEnabled(false)
      setTrackIndex(cards.length)
    }

    if (trackIndex === cards.length + 1) {
      setIsTransitionEnabled(false)
      setTrackIndex(1)
    }
  }

  useEffect(() => {
    if (isTransitionEnabled) return

    const frameId = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [isTransitionEnabled])

  if (cards.length === 0) {
    return null
  }

  return (
    <section
      id="carousel"
      className="w-full max-w-full min-w-0 overflow-hidden border-t border-white/30 px-5 py-16 sm:px-8 md:py-20"
    >
      <div className="w-full max-w-full min-w-0">
        {/* Carousel Title */}
        <h2 className="font-['BebasNeue'] text-4xl md:text-5xl uppercase mb-12 text-white">
          Другие проекты:
        </h2>

        {/* Mobile Projects List */}
        <div className="grid gap-10 lg:hidden">
          {cards.map((card) => {
            const mainImage = card.images.find((img) => img.isMain)
            const doubleSizeImage = card.images.find((img) => img.isDoubleSize)
            const stackedImages = card.images
              .filter((img) => !img.isMain && !img.isDoubleSize)
              .slice(0, 2)

            return (
              <article
                key={card.id}
                className="mx-auto grid w-full max-w-[520px] gap-2"
              >
                {/* Description block */}
                <div className="flex flex-col justify-between overflow-hidden rounded-[20px] bg-neutral-900 p-6">
                  <div className="my-3.5">
                    <h2 className="mb-4 font-['BebasNeue'] text-3xl uppercase">
                      {card.title}
                    </h2>
                    <p className="text-lg leading-relaxed text-white">
                      {card.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className={`rounded-full border border-white px-4 py-1.5 text-lg ${tag.isMainTag ? 'bg-white text-black' : ''}`}
                      >
                        {tag.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div className="aspect-video overflow-hidden rounded-[20px] bg-neutral-800">
                  {mainImage?.src ? (
                    <img
                      src={mainImage.src}
                      alt={card.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-500">
                      main image
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  {stackedImages.map((img, index) => (
                    <div
                      key={index}
                      className="aspect-video overflow-hidden rounded-[20px] bg-neutral-800"
                    >
                      {img.src ? (
                        <img
                          src={img.src}
                          alt={`${card.title} screenshot ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-neutral-500">
                          screenshot {index + 1}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="aspect-video overflow-hidden rounded-[20px] bg-neutral-800">
                  {doubleSizeImage?.src ? (
                    <img
                      src={doubleSizeImage.src}
                      alt={`${card.title} main screenshot`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-500">
                      double-size image
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        {/* Carousel Container */}
        <div className="relative hidden w-full max-w-full min-w-0 lg:block">
          {/* Cards Container */}
          <div className="w-full max-w-full min-w-0 overflow-hidden">
            <div
              onTransitionEnd={handleTrackTransitionEnd}
              className={`flex w-full min-w-0 ${isTransitionEnabled ? 'transition-transform duration-500 ease-out' : ''}`}
              style={{
                transform: `translateX(-${trackIndex * 100}%)`,
              }}
            >
              {renderedCards.map((card, renderedIndex) => {
                const mainImage = card.images.find((img) => img.isMain)
                const doubleSizeImage = card.images.find(
                  (img) => img.isDoubleSize,
                )
                const stackedImages = card.images
                  .filter((img) => !img.isMain && !img.isDoubleSize)
                  .slice(0, 2)

                return (
                  <div
                    key={`${card.id}-${renderedIndex}`}
                    className="min-w-0 max-w-full basis-full shrink-0"
                  >
                    <div className="grid gap-2 md:gap-4">
                      {/* Row 1: main image (50%) + description (50%) — row height = (width / 2) * 9/16 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 md:aspect-[32/9]">
                        {/* Main image — fills the row, aspect ratio preserved by 32:9 row */}
                        <div className="aspect-video md:aspect-auto md:h-full bg-neutral-800 rounded-[20px] overflow-hidden hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer">
                          {mainImage?.src ? (
                            <img
                              src={mainImage.src}
                              alt={card.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-500">
                              main image
                            </div>
                          )}
                        </div>

                        {/* Description block — also fills the row height */}
                        <div className="md:h-full bg-neutral-900 rounded-[20px] p-6 md:p-8 flex flex-col justify-between overflow-hidden">
                          {/* Middle: title + description */}
                          <div className="my-3.5 md:my-3.5">
                            <h2 className="font-['BebasNeue'] text-3xl md:text-5xl lg:text-6xl uppercase mb-4 md:mb-6">
                              {card.title}
                            </h2>
                            <p className="text-lg text-white leading-relaxed">
                              {card.description}
                            </p>
                          </div>

                          {/* Bottom: tags */}
                          <div className="flex flex-wrap gap-2">
                            {card.tags.map((tag) => (
                              <span
                                key={tag.id}
                                className={`px-4 py-1.5 border border-white rounded-full text-lg ${tag.isMainTag ? 'bg-white text-black' : ''}`}
                              >
                                {tag.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Row 3: stacked images (1/3) + double-size image (2/3) */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                        {/* Left column: 1/3 — either one merged image or two stacked */}
                        {card.mergeStackedImages ? (
                          <div className="bg-neutral-800 rounded-[20px] overflow-hidden hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer">
                            {stackedImages[0]?.src ? (
                              <img
                                src={stackedImages[0].src}
                                alt={`${card.title} screenshot 1`}
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
                                className="bg-neutral-800 rounded-[20px] overflow-hidden hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer"
                              >
                                {img.src ? (
                                  <img
                                    src={img.src}
                                    alt={`${card.title} screenshot ${index + 1}`}
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
                        <div className="md:col-span-2 bg-neutral-800 rounded-[20px] overflow-hidden hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer">
                          {doubleSizeImage?.src ? (
                            <img
                              src={doubleSizeImage.src}
                              alt={`${card.title} main screenshot`}
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
                  </div>
                )
              })}
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={goToPrevious}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 transition-colors duration-300 p-4 rounded-full backdrop-blur-sm hover:cursor-pointer"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={goToNext}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 transition-colors duration-300 p-4 rounded-full backdrop-blur-sm hover:cursor-pointer"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-gray-500 w-2 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="flex justify-center mt-6 text-gray-400 text-sm">
            {currentIndex + 1} / {cards.length}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Carousel
