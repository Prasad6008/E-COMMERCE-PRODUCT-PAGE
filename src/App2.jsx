import React, { useState,useEffect } from 'react'
import { motion ,AnimatePresence} from 'motion/react'
import deliveryicon from '/icons/truck.png'
import cart from '/icons/cart.png'
import heart from '/icons/heart.png'
import heartfilled from '/icons/heart-filled.png'
import chevron from '/icons/chevron.png'

const App = () => {
  const [selectedproduct,setselectedproduct] = useState(null)


  const [selectedColor,setSelectedColor] = useState("Red")
  const colors = [
    { name: "Red", value: "#ff233f" },
    { name: "Black", value: "#171923" },
    { name: "Silver", value: "#cbd0da" },
  ]


  const [cartCount, setCartCount] = useState(0)
  const [direction, setDirection] = useState(1)   // 1 = increase, -1 = decrease

  const increase = () => {
    setDirection(1)
    setCartCount(c => c + 1)
  }

  const decrease = () => {
    setDirection(-1)
    setCartCount(c => Math.max(0, c - 1))
  }


  const numberVariants = {
    enter: (dir) => ({ y: dir > 0 ? 24 : -24, opacity: 0 }),  // + from below, - from above
    center: { y: 0, opacity: 1 },
    exit: (dir) => ({ y: dir > 0 ? -24 : 24, opacity: 0 }),   // + leaves up, - leaves down
  }

  const [isFav,setFav] = useState(false)

  const [added, setAdded] = useState(false)

  const addToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)   // go back to normal after 1.6s
  }

  const burst = [
    { x: -22, y: -26 }, { x: 22, y: -26 },
    { x: -30, y: 4 },   { x: 30, y: 4 },
    { x: 0,   y: -34 },
  ]

  const products = [
    {
      id: 1,
      title: "AuraMax Pro",
      type: "Headboom",
      subtitle: "Over-Ear Headphones",
      img: "/images/headboom.png",
      features: [
        "Wireless",
        "Active Noise Cancelling",
        "40-Hour Battery"
      ],
      stars: "⭐⭐⭐⭐⭐",
      reviews: "856",
      compareAt: 449,
      rating: 4.8,
      description:
        "Experience immersive audio with AuraMax Pro over-ear headphones. Enjoy rich bass, crystal-clear sound, comfortable ear cushions, and advanced noise cancellation for music, work, and travel.",
      price: 349
    },
    {
      id: 2,
      title: "PulseX Watch",
      type: "Smartwatch",
      subtitle: "Smart Watch",
      img: "/images/s-watch.png",
      features: [
        "Heart Rate Tracking",
        "AMOLED Display",
        "7-Day Battery"
      ],
      stars: "⭐⭐⭐⭐⭐",
      reviews: "932",
      compareAt: 529,
      rating: 4.9,
      description:
        "Stay connected and track your daily activity with the PulseX Watch. Featuring a vibrant AMOLED display, fitness tracking, smart notifications, and long-lasting battery life, it keeps your essentials within reach.",
      price: 429
    },
    {
      id: 3,
      title: "SoundPods Pro",
      type: "Earbuds",
      subtitle: "Wireless Earbuds",
      img: "/images/airpods.png",
      features: [
        "Wireless",
        "Haptic Sensors",
        "Noise Cancelling"
      ],
      stars: "⭐⭐⭐⭐⭐",
      reviews: "1,247",
      compareAt: 499,
      rating: 4.7,
      description:
        "The SoundPods Pro are premium true wireless earbuds that deliver exceptional sound quality and comfort. With advanced noise cancellation and a long-lasting battery, they are perfect for music lovers on the go.",
      price: 349
    }
  ]

  useEffect(() => {
    const handleBack = () => {
      setselectedproduct(null)
    }

    window.addEventListener('popstate', handleBack)

    return () => {
      window.removeEventListener('popstate', handleBack)
    }
  }, [])

  return (
    <main className={`bg-[#050506] w-full min-h-screen lg:h-screen grid grid-col-1 p-4 sm:p-8 lg:p-15 overflow-x-clip`}>
      {/* <p className="text-white">
        Selected: {selectedproduct?.title ?? 'None'}
      </p> */}

      {/* <div className="pointer-events-none absolute -top-20 -left-20 h-40 w-40 rounded-full border-2 border-red-500 shadow-[0_0_10px_#ff1a35,0_0_25px_#ff1a3560]" /> */}
      <div className={`glow-pulse pointer-events-none absolute h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 rounded-full border-2 border-red-500 -left-10 -top-10 lg:-left-15 lg:-top-15 shadow-[0_0_10px_#ff1a35,0_0_25px_#ff1a35,0_0_35px_#ff1a35] ${selectedproduct? "hidden" : ""}`}></div>

      {/* Heading */}
      <div className={`px-2 sm:px-6 lg:px-15 pt-6 sm:pt-4 lg:pt-0 pb-6 lg:pb-0 ${selectedproduct? "hidden" : ""}`}>
        <h1 className={`enter-fade-down text-white text-3xl sm:text-4xl lg:text-5xl font-semibold`}>Featured Products</h1>
        <h4 className={`enter-fade-down text-[#888e92] pt-2 text-sm sm:text-base`} style={{ animationDelay: '120ms' }}>Handpicked premium tech for you</h4>
      </div>

      <div className={`w-full grid gap-4 sm:gap-6 lg:gap-7 ${selectedproduct ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
        {products
        .filter( i => !selectedproduct || i.id === selectedproduct.id )
        .map( (i, idx) =>
          (
           <div 
           key={i.title}
           style={{ animationDelay: `${200 + idx * 140}ms` }}
           onClick={() => {
            window.history.pushState({ productDetail: true }, '' , window.location.href)
            setselectedproduct(i)
          }}
           className={`group enter-fade-up flex cursor-pointer rounded-4xl  transition-all duration-700 ease-in-out ${selectedproduct?.id === i.id ? 'flex-col lg:flex-row gap-6 lg:gap-10 overflow-visible' : 'flex-col border border-[#37373b] hover:duration-300 hover:border-red-600/70 hover:shadow-[0_0_32px_-6px_#ff233f66]'} ${selectedproduct?.id === i.id ? 'overflow-visible' : ""}`}>

              {/* Image Section */}
              <motion.div layout transition={{layout:{type:"spring",stiffness:70,damping:18}}} className={`${selectedproduct?.id === i.id ? 'w-full lg:flex-1' : 'w-full'}`}>
                   <motion.img layout transition={{layout:{type:"spring",stiffness:70,damping:18}}} className={`w-full h-full bg-center object-cover transition-[filter] duration-500 ${selectedproduct?.id === i.id ? "max-h-[50vh] lg:max-h-none" : "border-b border-[#37373b] rounded-t-4xl group-hover:brightness-110"}`} src={i.img} alt={i.title} />
              </motion.div>

                {/* Contents Section */}
               <motion.div  className={` ${selectedproduct?.id === i.id ? 'w-full lg:flex-1 flex flex-col justify-between gap-5 lg:gap-0 lg:h-full' : 'w-full h-full rounded-b-4xl bg-[#0d0d11] px-5 py-3'}  `}>

                {/* Path */}
                <div className={`${selectedproduct?.id === i.id ? "visible flex flex-wrap gap-2 items-center text-sm sm:text-base reveal-left-right" : "hidden"}`}>
                  <span className={`text-white`}>Shop</span> <span className={`text-red-700`}><img className='w-4' src={chevron} alt="" /></span> <span className={`text-[#c99ca6]`}>{i.type}</span> <span className={`text-red-700`}><img className='w-4' src={chevron} alt="" /></span> <span className={`text-white`}>{i.title}</span>
                </div>

                {/* Product Title */}
                 <motion.h2
                    layout transition={{layout:{type:"spring",stiffness:70,damping:18}}}
                    className={`${selectedproduct?.id === i.id ? "text-4xl sm:text-5xl lg:text-7xl" : "text-2xl group-hover:text-red-400"} transition-colors duration-300 text-white font-semibold`}>{i.title}
                 </motion.h2>

                 {/* Product Features */}
                 <div className={`${selectedproduct?.id === i.id ? "visible flex flex-wrap gap-x-2 gap-y-1 text-sm sm:text-base fade-in" : "hidden"}`}>
                    {i.features?.map( (f,index) =>
                      (
                        <span key={index} className='flex gap-2 text-[#8c99ab] items-center transition-colors duration-300 hover:text-white'>
                          {index > 0 && <span className="text-red-500">•</span>}
                          {f}
                        </span>
                      )
                    )}
                </div>

                {/* Product Ratings */}
                <div className={`${selectedproduct?.id === i.id ? "visible flex flex-wrap gap-2 text-sm sm:text-base text-[#ccd8e2] fade-in" : "hidden"}`}>
                    <span>{i.stars}</span> <span className=''>{i.rating}</span> <span>|</span> <span>{i.reviews} reviews</span>
                </div>

                {/* Product Price */}
                <div className={`${selectedproduct?.id === i.id ? "visible flex items-end gap-3 sm:gap-5 text-[#ccd8e2] fade-in" : "hidden"}`}>
                    <span className='text-red-700 font-bold text-4xl sm:text-5xl'>${i.price}</span> <span className='text-[#434652]/80 text-xl sm:text-2xl line-through'>${i.compareAt}</span>
                </div>

                {/* Delivery Info */}
                <div className={`${selectedproduct?.id === i.id ? "max-w-full w-fit visible flex flex-wrap items-center gap-x-5 gap-y-2 text-sm sm:text-base text-[#ccd8e2] border border-red-700 px-4 sm:px-6 py-2 rounded-4xl transition-colors duration-300 hover:bg-red-700/10 fade-in" : "hidden"}`}>
                    <div className='flex gap-3'>
                      <span><img className='w-7 ' src={deliveryicon} alt="" /></span> <span>Free Shipping</span>
                    </div>
                    <div className='hidden sm:block text-red-600'>|</div>
                    <div>
                      3-5 days delivery
                    </div>
                </div>

                {/* Product Description */}
                <div className={`${selectedproduct?.id === i.id ? "visible flex fade-in" : "hidden"}`}>
                  <p className='text-[#ccd8e2] text-base sm:text-lg lg:text-[20px]'>{i.description}</p>
                </div>

                {/* Color Picker */}
                <div className={`${selectedproduct?.id === i.id ? "visible flex flex-col fade-in" : "hidden"}`}>
                  <h4 className='text-[#ccd8e2] text-base sm:text-lg lg:text-[20px]'>COLOR</h4>
                  <div className='text-[#ccd8e2] text-base sm:text-lg lg:text-[20px]'>
                    <div className='flex flex-wrap gap-3 mt-2'>
                       {colors.map((clr) => {
                        const active = selectedColor === clr.name

                        return (
                          <motion.button
                            key={clr.name}
                            onClick={() => setSelectedColor(clr.name)}
                            className={`relative flex items-center gap-3 sm:gap-4 rounded-full ${selectedColor === clr.name ? "border-none" :""}  border border-[#2f333b] px-3 sm:px-4 py-2 transition-colors duration-300 hover:border-red-500/60`}
                          >
                            {/* the sliding ring: only rendered inside the active button */}
                            {active && (
                              <motion.span
                                layoutId="color-ring"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                className={`absolute inset-0 rounded-full border-2 border-red-500 `}
                              />
                            )}

                            <span style={{ backgroundColor: clr.value }} className="relative h-5 w-5 rounded-full" />
                            <span className="relative text-sm sm:text-[16px]">{clr.name}</span>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                </div>


                {/* Cart */}
                <div className={`${selectedproduct?.id === i.id ? "visible flex flex-wrap sm:flex-nowrap flex-row items-center gap-3 sm:gap-5 justify-between fade-in" : "hidden"}`}>

                  {/* Inc Dec */}
                  <div className='order-1 w-fit h-full border border-[#2f333b] text-white flex items-center justify-between gap-2 sm:gap-4 px-2 py-2 rounded-xl text-2xl transition-colors duration-300 hover:border-red-600/60'>
                    <button className='w-10 sm:w-15 text-[25px] transition duration-200 hover:text-red-500 active:scale-90' onClick={decrease}>-</button>

                    {/* clipping window for the number */}
                    <span className='relative inline-flex h-9 w-10 items-center justify-center overflow-hidden'>
                      <AnimatePresence mode='popLayout' custom={direction} initial={false}>
                        <motion.span
                          key={cartCount}
                          custom={direction}
                          variants={numberVariants}
                          initial='enter'
                          animate='center'
                          exit='exit'
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className='absolute'
                        >
                          {cartCount}
                        </motion.span>
                      </AnimatePresence>
                    </span>

                    <button className='w-10 sm:w-15 text-[25px] transition duration-200 hover:text-red-500 active:scale-90' onClick={increase}>+</button>
                  </div>

                  {/* Cart Button */}
                  <motion.button
                    onClick={addToCart}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 24px #f4272a88' }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ backgroundColor: added ? '#16a34a' : '#f4272a' }}
                    className='order-3 sm:order-2 flex justify-center h-full items-center gap-3 w-full px-3 py-3 sm:py-2 rounded-xl'
                  >
                    <AnimatePresence mode='wait' initial={false}>
                      {added ? (
                        <motion.span
                          key='done'
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className='text-white text-[15px]'
                        >
                          ✓ Added to cart
                        </motion.span>
                      ) : (
                        <motion.span
                          key='add'
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className='flex items-center gap-3'
                        >
                          <img className='w-5' src={cart} alt='' />
                          <span className='text-white text-[15px]'>Add to cart</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Like Button */}
                  <motion.div
                      onClick={() => setFav(!isFav)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.85 }}
                      className='order-2 sm:order-3 border flex justify-center items-center h-full border-[#2f333b] px-3 py-3 rounded-xl cursor-pointer transition-colors hover:border-red-600 hover:bg-red-600/10'
                  >
                      {/* heart goes here (step 2) */}
                      <motion.img
                      key={String(isFav)}
                      initial={{ scale: 0.4, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 12 }}
                      className='w-9'
                      src={isFav ? heartfilled : heart}
                      alt=''
                    />

                      <AnimatePresence>
                        {isFav && burst.map((p, i) => (
                          <motion.span
                            key={i}
                            initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
                            animate={{ x: p.x, y: p.y, scale: 1, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className='pointer-events-none absolute text-red-500 text-sm'
                          >
                            ♥
                          </motion.span>
                        ))}
                      </AnimatePresence>
                  </motion.div>

                 </div>

                 <h4  className={`text-[#888e92] text-[16px] transition-colors duration-300 group-hover:text-[#c3c8cc] ${selectedproduct?.id === i.id ? 'hidden' : ''}`}>{i.subtitle}</h4>
                 <div className="flex justify-between items-end">
                      <motion.span
                          layout
                          animate={
                            selectedproduct?.id === i.id
                              ? {
                                  opacity: 0,
                                  scale: 1.8,
                                  x: 120,
                                  y: -100,
                                }
                              : {
                                  opacity: 1,
                                  scale: 1,
                                  x: 0,
                                  y: 0,
                                }
                          }
                          transition={{
                            opacity: {
                              duration: 1.7,
                              ease: "easeInOut",
                            },
                            scale: {
                              duration: 1.2,
                              ease: "easeInOut",
                            },
                            x: {
                              duration: 0.8,
                              ease: "easeInOut",
                            },
                            y: {
                              duration: 0.8,
                              ease: "easeInOut",
                            },
                            layout: {
                              type: "spring",
                              stiffness: 70,
                              damping: 18,
                            },
                          }}
                          className={`${
                            selectedproduct?.id === i.id
                              ? "z-50 line-through text-[40px] sm:text-[64px] lg:text-[100px] font-bold text-[#da2836] absolute top-40 right-6 sm:top-56 sm:right-24 lg:top-70 lg:right-60 pointer-events-none"
                              : "text-3xl sm:text-4xl font-bold text-[#da2836]"
                          }`}
                        >
                          ${i.compareAt}
                      </motion.span>
                      <span
                          className={`text-[15px] font-bold text-[#999da2] transition-colors duration-300 group-hover:text-white ${
                            selectedproduct?.id === i.id ? "hidden" : ""
                          }`}
                        >
                          ⭐{i.rating}
                      </span>
                 </div>
               </motion.div>

            </div>
          )
        )}
      </div>
    </main>
  )
}

export default App
