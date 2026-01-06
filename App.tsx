import React, { useState, useMemo, useEffect } from 'react';
import { AppStep, TripChoice } from './types';
import { DISTRICTS, RESTAURANTS, ATMOSPHERIC_PLACES, SLOW_WALKS } from './constants';
import { ArrowRight, Calendar, MapPin, Utensils, ShoppingBag, BookOpen, Check, ChevronLeft, Gift, Heart, Coffee, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('welcome');
  const [choices, setChoices] = useState<TripChoice>({
    departureDate: '',
    arrivalDate: '',
    district: '',
    restaurant: ''
  });

  const sequence: AppStep[] = ['welcome', 'memory', 'quote', 'date', 'stay', 'dine', 'explore', 'commitment', 'summary'];

  const nextStep = () => {
    const currentIndex = sequence.indexOf(step);
    if (currentIndex < sequence.length - 1) {
      setStep(sequence[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    const currentIndex = sequence.indexOf(step);
    if (currentIndex > 0) {
      setStep(sequence[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const maxArrivalDate = useMemo(() => {
    if (!choices.departureDate) return undefined;
    const date = new Date(choices.departureDate);
    date.setDate(date.getDate() + 6);
    return date.toISOString().split('T')[0];
  }, [choices.departureDate]);

  useEffect(() => {
    if (choices.departureDate && choices.arrivalDate) {
      const dep = new Date(choices.departureDate);
      const arr = new Date(choices.arrivalDate);
      const diffTime = Math.abs(arr.getTime() - dep.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 6 || arr < dep) {
        setChoices(prev => ({ ...prev, arrivalDate: '' }));
      }
    }
  }, [choices.departureDate, choices.arrivalDate]);

  const selectedDistrict = useMemo(() => DISTRICTS.find(d => d.id === choices.district), [choices.district]);
  const selectedRestaurant = useMemo(() => RESTAURANTS.find(r => r.id === choices.restaurant), [choices.restaurant]);

  // Roma background should start from 'date' (Slide 4)
  const showRomaBackground = ['date', 'stay', 'dine', 'explore', 'commitment', 'summary'].includes(step);

  const renderStep = () => {
    const backButtonClass = "fixed top-6 left-6 md:top-10 md:left-12 flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-colors uppercase tracking-widest text-xs font-semibold group z-50 px-3 py-2 bg-white/30 backdrop-blur-sm rounded-lg print:hidden";

    return (
      <div className="relative w-full">
        {step !== 'welcome' && (
          <button onClick={prevStep} className={backButtonClass}>
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Назад
          </button>
        )}

        {showRomaBackground && (
          <div className="fixed inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none">
            <span className="text-gold-subtle text-[25vw] md:text-[30vw] font-serif italic whitespace-nowrap leading-none select-none">
              Roma
            </span>
          </div>
        )}

        <div className="relative z-10 w-full">
          {(() => {
            switch (step) {
              case 'welcome':
                return (
                  <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 animate-in fade-in zoom-in duration-1000 overflow-hidden">
                    {/* Background Gift Icons */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                      <Gift size={120} className="absolute top-[10%] left-[15%] -rotate-12 text-stone-300" />
                      <Gift size={80} className="absolute top-[60%] left-[5%] rotate-12 text-stone-400" />
                      <Gift size={100} className="absolute top-[20%] right-[10%] rotate-6 text-stone-300" />
                      <Gift size={90} className="absolute bottom-[15%] right-[20%] -rotate-6 text-stone-400" />
                      <Gift size={60} className="absolute top-[45%] right-[5%] -rotate-12 text-stone-300" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <div className="mb-8 p-4 bg-stone-100 rounded-full text-stone-800 animate-bounce inline-block">
                        <Gift size={40} />
                      </div>
                      <h1 className="text-5xl md:text-7xl mb-6 font-serif italic text-stone-800 leading-tight max-w-4xl mx-auto">З Днем Народження, Принцесо!</h1>
                      <p className="text-xl md:text-2xl mb-12 text-stone-600 max-w-2xl font-light leading-relaxed mx-auto">
                        Тут мій маленький подарунок на твій день народження. Тисни на кнопочку!
                      </p>
                      <button 
                        onClick={nextStep}
                        className="px-12 py-5 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all tracking-widest text-sm uppercase flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95 group mx-auto"
                      >
                        Відкрити <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );

              case 'memory':
                return (
                  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-in fade-in duration-1000 relative">
                    <div className="space-y-6 max-w-4xl">
                      <p className="text-xl md:text-3xl font-serif text-stone-600 leading-relaxed font-light">
                        Я пам’ятаю, ти казала, що дуже хочеш в одне красиве місце.
                      </p>
                      <p className="text-xl md:text-3xl font-serif text-stone-600 leading-relaxed font-light">
                        І я подумав, що бажання мають збуватися тихо і красиво...
                      </p>
                      <h2 className="text-4xl md:text-6xl font-serif text-stone-900 italic font-bold pt-6 animate-pulse">
                        Особливо твої
                      </h2>
                    </div>
                    <button 
                      onClick={nextStep}
                      className="mt-20 px-16 py-6 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all tracking-widest text-sm uppercase font-bold flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 group"
                    >
                      Що я зробив? Тицяй сюди <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                );

              case 'quote':
                return (
                  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-in fade-in duration-1000 relative">
                    <h2 className="text-xl md:text-3xl mb-16 font-serif italic text-stone-800 leading-[1.8] max-w-4xl px-6">
                      Італія — це місце, яке стає частиною<br />
                      спогадів на все життя.
                    </h2>
                    <button 
                      onClick={nextStep}
                      className="px-16 py-6 border-2 border-stone-900 text-stone-900 rounded-full hover:bg-stone-900 hover:text-white transition-all tracking-widest text-sm uppercase font-bold flex items-center gap-3 shadow-sm hover:shadow-xl hover:scale-105 active:scale-95 group"
                    >
                      Почати подорож <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                );

              case 'date':
                return (
                  <div className="max-w-4xl mx-auto py-12 px-4 animate-in slide-in-from-bottom-4 duration-700 text-center relative">
                    <div className="mb-16">
                      <p className="text-xl md:text-2xl font-serif text-stone-900 mb-2 font-medium">Я хочу здійснити твою маленьку мрію та подарувати тобі</p>
                      <h1 className="text-7xl md:text-9xl font-serif italic text-stone-900 mb-8 font-bold">Рим</h1>
                      <p className="text-stone-900 text-xl md:text-2xl font-serif leading-relaxed max-w-3xl mx-auto font-medium">
                        І хочу, щоб все складалось під твій ритм, твій настрій і твої бажання. Перше, що тобі потрібно — це обрати свій тиждень у Вічному Місті.
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-8 items-center max-w-2xl mx-auto">
                      <div className="flex-1 w-full text-left">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-3 ml-2">Виліт</label>
                        <div className="relative group">
                          <input 
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            value={choices.departureDate}
                            onChange={(e) => setChoices({ ...choices, departureDate: e.target.value })}
                            className="w-full p-5 bg-white border border-stone-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-stone-800/5 focus:border-stone-800 outline-none transition-all font-serif text-lg cursor-pointer"
                          />
                          <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 group-hover:text-stone-800 transition-colors pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex-1 w-full text-left">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-3 ml-2">Прибуття</label>
                        <div className="relative group">
                          <input 
                            type="date"
                            min={choices.departureDate || new Date().toISOString().split('T')[0]}
                            max={maxArrivalDate}
                            value={choices.arrivalDate}
                            disabled={!choices.departureDate}
                            onChange={(e) => setChoices({ ...choices, arrivalDate: e.target.value })}
                            className="w-full p-5 bg-white border border-stone-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-stone-800/5 focus:border-stone-800 outline-none transition-all font-serif text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 group-hover:text-stone-800 transition-colors pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {choices.departureDate && choices.arrivalDate && (
                      <button 
                        onClick={nextStep}
                        className="mt-16 px-16 py-5 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all flex items-center gap-3 mx-auto shadow-xl hover:scale-105"
                      >
                        Продовжити <ArrowRight size={18} />
                      </button>
                    )}
                  </div>
                );

              case 'stay':
                return (
                  <div className="max-w-6xl mx-auto pt-4 pb-12 px-4 animate-in slide-in-from-bottom-4 duration-700 relative">
                    <div className="text-center mb-10 pt-4">
                      <h2 className="text-4xl md:text-5xl font-serif mb-6 text-stone-800 leading-tight">
                        Місто відчувається по-різному<br />
                        <span className="italic">залежно від того, де ти живеш</span>
                      </h2>
                      <p className="text-stone-500 max-w-xl mx-auto text-lg font-light leading-relaxed">
                        Обери район,<br />
                        у якому тобі захочеться прокидатися<br />
                        і повертатися ввечері
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {DISTRICTS.map((district) => (
                        <div 
                          key={district.id}
                          onClick={() => setChoices({ ...choices, district: district.id })}
                          className={`group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-500 relative ${choices.district === district.id ? 'border-stone-800 shadow-2xl scale-[1.02] bg-white' : 'border-transparent shadow-sm opacity-80 hover:opacity-100 bg-white/50'}`}
                        >
                          <div className="h-64 overflow-hidden relative">
                            <img src={district.image} alt={district.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                          </div>
                          <div className="p-8">
                            <h3 className="text-2xl font-serif mb-3 text-stone-800">{district.name}</h3>
                            <p className="text-stone-500 text-sm leading-relaxed font-light mb-4">{district.description}</p>
                            <div className="pt-4 border-t border-stone-100">
                              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">Поруч:</p>
                              <p className="text-xs text-stone-600 italic">{district.landmarksNearby}</p>
                            </div>
                            {choices.district === district.id && (
                              <div className="mt-6 text-stone-900 flex items-center justify-center animate-in fade-in slide-in-from-bottom-2">
                                <Check size={20} className="text-green-600" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {choices.district && (
                      <button 
                        onClick={nextStep}
                        className="mt-16 px-12 py-4 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all flex items-center gap-2 mx-auto shadow-lg"
                      >
                        Обираємо ресторан <ArrowRight size={18} />
                      </button>
                    )}
                  </div>
                );

              case 'dine':
                return (
                  <div className="max-w-6xl mx-auto pt-0 pb-12 px-4 animate-in slide-in-from-bottom-4 duration-700 relative">
                    <div className="text-center mb-10 pt-16">
                      <h2 className="text-4xl md:text-5xl font-serif mb-4 text-stone-800 italic">Це ще не все!</h2>
                      <p className="text-stone-600 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Я хочу щоб твоя подорож була смачною, тому в поїздку входить вечеря на двох в одному з цих особливих місць. Вибери те, що тобі до душі!
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {RESTAURANTS.map((rest) => (
                        <div 
                          key={rest.id}
                          onClick={() => setChoices({ ...choices, restaurant: rest.id })}
                          className={`group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-500 bg-white ${choices.restaurant === rest.id ? 'border-stone-800 shadow-2xl scale-[1.02]' : 'border-transparent shadow-sm opacity-80 hover:opacity-100'}`}
                        >
                          <div className="h-64 overflow-hidden relative">
                            <img src={rest.image} alt={rest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                              <Utensils size={16} className="text-stone-600" />
                            </div>
                          </div>
                          <div className="p-8">
                            <h3 className="text-2xl font-serif mb-3 text-stone-800">{rest.name}</h3>
                            <p className="text-stone-500 text-sm leading-relaxed font-light mb-4">{rest.description}</p>
                            {choices.restaurant === rest.id && (
                              <div className="mt-6 text-stone-900 flex items-center justify-center animate-in fade-in slide-in-from-top-2">
                                <Check size={20} className="text-green-600" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {choices.restaurant && (
                      <button 
                        onClick={nextStep}
                        className="mt-16 px-12 py-4 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all flex items-center gap-2 mx-auto shadow-lg"
                      >
                        Пам'ятки міста <ArrowRight size={18} />
                      </button>
                    )}
                  </div>
                );

              case 'explore':
                return (
                  <div className="max-w-5xl mx-auto py-12 px-4 animate-in slide-in-from-bottom-4 duration-700 relative">
                    <div className="text-center mt-12 mb-20">
                      <h2 className="text-4xl md:text-6xl font-serif mb-6 text-stone-800 leading-tight italic">Місця, які я хотів показати саме тобі</h2>
                      <p className="text-stone-800 max-w-2xl mx-auto text-lg font-bold leading-relaxed">
                        Я вибрав ці місця не за списками з інтернету, а за відчуттям. Це ті куточки міста, де хочеться зупинитись, подивитись навколо і запамʼятати момент.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 mb-32">
                      {ATMOSPHERIC_PLACES.map((place, index) => (
                        <div key={place.name} className="group flex flex-col space-y-4">
                          <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-sm relative border border-stone-100 hover:shadow-xl transition-shadow duration-500">
                            <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2.5s]" />
                            <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors" />
                          </div>
                          <div className="space-y-2 px-2">
                            <div className="flex items-center gap-3">
                              <span className="text-stone-400 font-serif italic text-4xl">0{index + 1}</span>
                              <h3 className="text-lg font-serif text-stone-900 font-bold tracking-tight">{place.name}</h3>
                            </div>
                            <p className="text-stone-700 font-bold leading-relaxed text-sm italic">
                              «{place.description}»
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="relative pt-32 pb-16 border-t border-stone-100">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-8 text-stone-400">
                        <Sparkles size={24} />
                      </div>
                      
                      <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-serif text-stone-900 italic mb-4 font-bold">Повільні прогулянки Римом</h2>
                        <p className="text-stone-600 text-xs uppercase tracking-[0.4em] font-bold">Кілька ідей для твого ідеального ритму</p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-6 order-1">
                          <div className="bg-stone-50/70 p-8 md:p-12 rounded-[3rem] border border-stone-100 relative group overflow-hidden shadow-sm">
                            <div className="flex items-center gap-4 mb-10 text-stone-900">
                              <BookOpen size={28} className="text-stone-600" />
                              <h3 className="text-3xl font-serif font-bold italic tracking-tight">Книгарні</h3>
                            </div>
                            <div className="space-y-12 relative z-10">
                              {SLOW_WALKS.bookstores.map(item => (
                                <div key={item.name} className="flex flex-col sm:flex-row gap-6 group/item">
                                  <div className="w-full sm:w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm border-2 border-white">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700" />
                                  </div>
                                  <div className="flex flex-col justify-center">
                                    <h4 className="font-bold text-stone-900 text-xl mb-1 group-hover/item:text-stone-600 transition-colors">{item.name}</h4>
                                    <p className="text-sm text-stone-800 font-bold italic leading-relaxed">{item.note}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-16 pt-8 border-t border-stone-200/50">
                              <p className="text-[11px] uppercase tracking-[0.3em] text-stone-600 font-bold">Особливий вибір для твоєї душі</p>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-6 order-2 flex flex-col gap-20 py-4">
                          <div className="grid grid-cols-1 gap-12">
                            <div>
                              <div className="flex items-center gap-4 mb-10 text-stone-600">
                                <ShoppingBag size={20} />
                                <span className="uppercase tracking-[0.5em] text-[10px] font-bold">Магазини з душею</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                {SLOW_WALKS.shops.map(item => (
                                  <div key={item.name} className="space-y-3">
                                    <h4 className="font-serif text-2xl text-stone-900 font-bold group-hover:text-stone-600 transition-colors">{item.name}</h4>
                                    <p className="text-xs text-stone-700 font-bold uppercase tracking-widest leading-relaxed">{item.note}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center gap-4 mb-10 text-stone-600">
                                <Coffee size={20} />
                                <span className="uppercase tracking-[0.5em] text-[10px] font-bold">Торгові центри</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                {SLOW_WALKS.malls.map(item => (
                                  <div key={item.name} className="space-y-3">
                                    <h4 className="font-serif text-2xl text-stone-900 font-bold group-hover:text-stone-600 transition-colors">{item.name}</h4>
                                    <p className="text-xs text-stone-700 font-bold uppercase tracking-widest leading-relaxed">{item.note}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={nextStep}
                      className="mt-24 px-16 py-6 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all flex items-center gap-3 mx-auto shadow-2xl hover:scale-105 active:scale-95 font-bold uppercase tracking-widest text-[10px]"
                    >
                      Я вже хочу в Рим! <ArrowRight size={16} />
                    </button>
                  </div>
                );

              case 'commitment':
                return (
                  <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-1000 text-center relative flex flex-col items-center justify-center min-h-[70vh]">
                    <div className="mb-12 text-stone-300">
                      <Sparkles size={64} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-12 leading-tight font-bold">
                      Ти щойно створила свою подорож до Риму.<br />
                      <span className="italic font-normal text-stone-700">Дати, ритм, простір — усе так, як відчувається правильно для тебе.</span>
                    </h2>
                    <p className="text-xl md:text-3xl text-stone-800 font-serif italic mb-16 max-w-2xl mx-auto">
                      Все інше я беру на себе.
                    </p>
                    <button 
                      onClick={nextStep}
                      className="px-16 py-6 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95 font-bold uppercase tracking-widest text-xs mx-auto"
                    >
                      Переглянути підсумок <ArrowRight size={18} />
                    </button>
                  </div>
                );

              case 'summary':
                return (
                  <div className="max-w-4xl mx-auto py-16 px-4 animate-in zoom-in duration-700 text-center relative">
                    <div className="space-y-6 mb-16 max-w-3xl mx-auto text-stone-800 font-serif text-xl md:text-2xl leading-relaxed">
                      <p>Це мій подарунок тобі. І мій спосіб сказати:</p>
                      <p className="font-bold text-stone-900">Я хочу робити тебе по справжньому щасливою.</p>
                      <p>Сподіваюсь, сьогодні у мене це вийшло...</p>
                      <p className="pt-4">З днем народження, Олічка!</p>
                    </div>

                    <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl border border-stone-50 relative overflow-hidden text-left mb-16">
                      <div className="absolute top-0 right-0 p-12 text-8xl font-serif opacity-5 select-none italic pointer-events-none">Roma</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                        <div className="space-y-12">
                          <div className="flex gap-6 items-start">
                            <div className="bg-stone-50 p-5 rounded-2xl text-stone-800 shadow-sm border border-stone-100"><Calendar size={32} /></div>
                            <div>
                              <p className="text-[10px] text-stone-400 uppercase tracking-[0.3em] mb-2 font-bold">Період поїздки</p>
                              <p className="text-2xl font-serif text-stone-800 leading-snug">
                                {choices.departureDate && choices.arrivalDate 
                                  ? `${new Date(choices.departureDate).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' })} — ${new Date(choices.arrivalDate).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' })}` 
                                  : 'Оберіть дати'}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-6 items-start">
                            <div className="bg-stone-50 p-5 rounded-2xl text-stone-800 shadow-sm border border-stone-100"><MapPin size={32} /></div>
                            <div>
                              <p className="text-[10px] text-stone-400 uppercase tracking-[0.3em] mb-2 font-bold">Вибраний район</p>
                              <p className="text-3xl font-serif text-stone-800">{selectedDistrict?.name || 'Roma'}</p>
                            </div>
                          </div>

                          <div className="flex gap-6 items-start">
                            <div className="bg-stone-50 p-5 rounded-2xl text-stone-800 shadow-sm border border-stone-100"><Utensils size={32} /></div>
                            <div>
                              <p className="text-[10px] text-stone-400 uppercase tracking-[0.3em] mb-2 font-bold">Святкова вечеря</p>
                              <p className="text-3xl font-serif text-stone-800">{selectedRestaurant?.name || 'Chef\'s Table'}</p>
                              <div className="flex items-center gap-2 mt-2 text-stone-400 italic text-sm">
                                <Heart size={14} className="fill-stone-400" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-center">
                          <div className="relative group">
                            <div className="absolute -inset-4 bg-stone-100/50 rounded-[2.5rem] blur-xl group-hover:bg-stone-200/50 transition-colors" />
                            <img 
                              src={selectedDistrict?.image || 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80'} 
                              alt="Rome Destination" 
                              className="w-full h-64 object-cover rounded-[2rem] shadow-xl border-8 border-white relative z-10" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 print:hidden">
                      <button 
                        onClick={() => window.print()}
                        className="px-12 py-5 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl flex items-center gap-3"
                      >
                        Відправити план чарівнику <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })()}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-marble selection:bg-stone-200 selection:text-stone-900 transition-colors duration-1000">
      <main className={['welcome', 'memory', 'quote', 'date'].includes(step) ? 'flex items-center justify-center min-h-screen overflow-hidden' : (['stay', 'dine'].includes(step) ? 'pt-8 pb-24' : 'pt-20 pb-24')}>
        <div className="w-full">
          {renderStep()}
        </div>
      </main>

      {step !== 'welcome' && step !== 'memory' && step !== 'quote' && step !== 'date' && step !== 'summary' && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex gap-4 px-8 py-4 bg-white/70 backdrop-blur-xl rounded-full shadow-2xl border border-white/50 print:hidden z-50">
          {sequence.filter(s => !['welcome', 'memory', 'quote', 'date', 'summary'].includes(s)).map((s) => (
            <div 
              key={s} 
              className={`h-1.5 rounded-full transition-all duration-700 ${step === s ? 'bg-stone-800 w-12' : 'bg-stone-200 w-2'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;