import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/app/elements/app-sidebar';
import { Film } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  image?: string; // Optional, add real paths if available
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Review Ván Cờ Vây (Netflix) – Bàn tiệc diễn xuất có một không hai Lee Byung Hun và Yoo Ah In',
    author: 'linhnhu0257',
    date: '26 ngày trước',
    content: 'Ván Có Vây (The Match) vừa thiệt lập những thành tích phòng vé ấn tượng tại quê nhà Hàn Quốc. Sau đó, chiếm lĩnh top 1 Netflix sau khi ra mắt trên nền tảng hơn 1 ngày.',
    image: 'https://example.com/van-co-vay.jpg', // Replace with real image
  },
  {
    id: 2,
    title: 'Until Dawn: Bí Mật Kinh Hoàng – Phim kinh dị 18+ chuyển thể từ game kinh điển',
    author: 'linhnhu0257',
    date: '27 ngày trước',
    content: 'Until Dawn là phim kinh dị dược chuyển thể từ game kinh dị vô cùng ăn khách của Sony. Mất đến 10 năm trời, câu chuyện đen tối này mới có thể đến với các khán giả yêu phim.',
    image: 'https://example.com/until-dawn.jpg', // Replace with real image
  },
];

export default function NewsUpdatesPage() {
  return (
    <div className="bg-jet-black min-h-screen text-white flex">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <div className="flex-1 flex flex-col p-6">
          <a href="/" className="flex items-center gap-2 mb-8">
            <Film className="h-10 w-10 text-red-600" />
            <div className="text-3xl font-alfa text-red-500">CineBook</div>
          </a>
          <h1 className="text-3xl font-bold mb-6">News & Updates</h1>
          <ul className="space-y-6">
            {newsData.map((item: NewsItem) => (
              <li
                key={item.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-64 h-64 object-cover"
                />
                <div className="p-4 flex-1">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-400">{item.author} - {item.date}</p>
                  <p className="text-sm mt-2">{item.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SidebarProvider>
    </div>
  );
}