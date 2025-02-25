import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const games = [
  { id: 'puzzle', name: "رتبي الأرقام يحبيبتي", icon: "🧩", color: "bg-blue-200" },
  { id: 'coloring', name: "لوني يعسوله", icon: "🎨", color: "bg-green-200" },
  { id: 'game', name: "الصور المتشابهه ", icon: "👀", color: "bg-orange-200" },
  { id: 'words', name: "لعبه تافهه بس كلمه متخبطه", icon: "🔤", color: "bg-yellow-200" },
  { id: 'numbers', name: "شغلي دماغك", icon: "🔢", color: "bg-purple-200" },
  { id: 'bubble-pop', name: "فرقعي الفقاقيع", icon: "🫧", color: "bg-cyan-200" },
  { id: 'catch-hearts', name: "اجري ورا قلبي يبنوتي", icon: "❤️", color: "bg-red-200" },
  { id: 'whack-a-mole', name: "اقفشي البتاع ده", icon: "🐹", color: "bg-brown-200" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 p-4 font-cairo">
      <h1 className="text-4xl font-bold text-center mb-6 text-purple-600 animate-bounce">يلا نلعب يا بنوتي 🤩❤️</h1>
      <p className="text-2xl text-center mb-8 text-purple-600 animate-pulse">
        كل الألعاب دي عشان بنوتي تبقى مبسوطه كل ما تزهقي يبنوتي خشي هنا والعبي براحتك❤️
      </p>
        <p className="text-2xl text-center mb-8 text-purple-600 animate-pulse">
          في لعبه جديده يبنوتي دوري عليها👀
        </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {games.map((game) => (
          <Link 
            href={game.id === 'game' ? `/game/index.html` : `/games/${game.id}`} 
            key={game.id}
          >
            <Card className={`${game.color} hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer rounded-2xl overflow-hidden`}>
              <CardHeader className="bg-white bg-opacity-30">
                <CardTitle className="text-xl sm:text-2xl font-bold text-center text-purple-700">
                  {game.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-6xl sm:text-7xl text-center my-4 animate-wiggle">{game.icon}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
