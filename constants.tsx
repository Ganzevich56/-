
import { Place } from './types';

export const DISTRICTS: Place[] = [
  {
    id: 'trastevere',
    name: 'Трастевере',
    description: 'Найоригінальніший та найатмосферніший район Риму. Вузькі бруковані вулички, вкриті плющем стіни та дух справжньої Італії.',
    landmarksNearby: 'Базиліка Санта-Марія-ін-Трастевере, пагорб Янікул, острів Тіберіна.',
    image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=80',
    category: 'district'
  },
  {
    id: 'centro',
    name: 'Centro Storico',
    description: 'Епіцентр римської величі. Ви будете жити серед шедеврів бароко та античності, де кожен крок — це історія.',
    landmarksNearby: 'Пантеон, Площа Навона, Фонтан Треві, Кампо-де-Фьорі.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    category: 'district'
  },
  {
    id: 'monti',
    name: 'Монті',
    description: 'Район богемного шику та вінтажних бутіків. Поєднання молодої енергії міста з видом на античні руїни.',
    landmarksNearby: 'Колізей, Римський Форум, Базиліка Санта-Марія-Маджоре.',
    image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=800&q=80',
    category: 'district'
  }
];

export const RESTAURANTS: Place[] = [
  {
    id: 'r1',
    name: 'Ambrosia Rooftop Restaurant',
    description: 'Витончений ресторан з панорамною терасою. Ідеальне місце для романтичної вечері з видом на Вічне Місто та куполи соборів.',
    image: 'https://resdiary-prod.azureedge.net/uploads/uk/23831/images/45590/Portal/LargeMainImage/img159764.jpg',
    category: 'restaurant'
  },
  {
    id: 'r2',
    name: '47 Circus Roof Garden',
    description: 'Неймовірний вид на храм Геркулеса та Великий цирк. Сучасна римська кухня в атмосфері квітучого саду на даху.',
    image: 'https://www.therooftopguide.com/rooftop-bars-in-rome/Bilder/47-circus-roof-garden-600-14.jpg',
    category: 'restaurant'
  },
  {
    id: 'r3',
    name: 'Les Étoiles Rooftop',
    description: 'Один з найкращих краєвидів на собор Святого Петра. Місце, де велична архітектура поєднується з вишуканою гастрономією.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/7c/15/53/sunset.jpg?w=900&h=500&s=1',
    category: 'restaurant'
  }
];

export const ATMOSPHERIC_PLACES = [
  {
    name: 'Апельсиновий сад (Giardino degli Aranci)',
    description: 'Місце з неймовірним заходом сонця та запахом цитрусових, де місто розкривається як на долоні.',
    image: 'https://www.divento.com/14563/jardin-de-los-naranjos-roma.jpg'
  },
  {
    name: 'Віа Маргутта (Via Margutta)',
    description: 'Вулиця художників, тиха і затишна, де кожен дворик схожий на живу картину.',
    image: 'https://romeing.b-cdn.net/wp-content/uploads/2025/09/cento-pittori-via-margutta-1-e1524846860673.jpg'
  },
  {
    name: 'Міст Святого Ангела (Ponte Sant\'Angelo)',
    description: 'Особливо ввечері, коли вогні замку відбиваються у Тибрі, створюючи справжню кіноатмосферу.',
    image: 'https://bridgesall.ru/_2025/04122025/20.webp'
  },
  {
    name: 'Замочна щілина (Buco della Serratura)',
    description: 'Маленький секрет пагорба Авентін, крізь який можна побачити купол Святого Петра в ідеальній перспективі.',
    image: 'https://wp.en.aleteia.org/wp-content/uploads/sites/2/2017/05/web-at017-buco-della-serratura-vatican-rome-shutterstock-15.jpg'
  },
  {
    name: 'Площа Ротонда (Piazza della Rotonda)',
    description: 'Ранкова кава під звуки прокидаючогося Риму, коли сонце тільки торкається величних колон Пантеону.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Rome_Pantheon_facade_and_Piazza_della_Rotonda.jpg'
  },
  {
    name: 'Фонтан Треві (Fontana di Trevi)',
    description: 'Магічне місце, де час ніби зупиняється, особливо якщо прийти на світанку, щоб загадати наше спільне бажання.',
    image: 'https://www.yuliiapronko.com/wp-content/uploads/2022/06/IMG_1946-e1656415824549-768x1024.jpg'
  }
];

export const SLOW_WALKS = {
  bookstores: [
    { 
      name: 'Libreria del Viaggiatore', 
      note: 'магія подорожей у книгах',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80'
    },
    { 
      name: 'L\'Angolo dell\'Avventura', 
      note: 'куточок для мрійників',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80'
    }
  ],
  shops: [
    { name: 'Via del Governo Vecchio', note: 'вінтажний дух Риму' },
    { name: 'Castroni', note: 'найкращі італійські смаколики' }
  ],
  malls: [
    { name: 'Rinascente Via del Tritone', note: 'тераса на даху та історія під ногами' },
    { name: 'Galleria Alberto Sordi', note: 'архітектурний шедевр для шопінгу' }
  ]
};
