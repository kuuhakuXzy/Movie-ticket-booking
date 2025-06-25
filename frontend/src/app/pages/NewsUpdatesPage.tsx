import AppSidebar from '@/app/elements/app-sidebar';
import news1 from '@/assets/news1.jpg';
import news2 from '@/assets/news2.jpg';
import news3 from '@/assets/news3.jpg';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsItem {
  id: number;
  title: string;
  link: string;
  author: string;
  date: string;
  content: string;
  image?: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Review Ván Cờ Vây (Netflix) – Bàn tiệc diễn xuất có một không hai của Lee Byung Hun và Yoo Ah In',
    link: 'https://moveek.com/bai-viet/review-van-co-vay-netflix-the-match-lee-byung-hun-va-yoo-ah-in/33667',
    author: 'linhnhu0257',
    date: '26 ngày trước',
    content: 'Ván Có Vây (The Match) vừa thiệt lập những thành tích phòng vé ấn tượng tại quê nhà Hàn Quốc. Sau đó, chiếm lĩnh top 1 Netflix sau khi ra mắt trên nền tảng hơn 1 ngày.',
    image: news1,
  },
  {
    id: 2,
    title: 'Until Dawn: Bí Mật Kinh Hoàng – Phim kinh dị 18+ chuyển thể từ game kinh điển',
    link: 'https://moveek.com/bai-viet/until-dawn-bi-mat-kinh-hoang-phim-kinh-di-18-chuyen-the-tu-game-kinh-dien/33661',
    author: 'linhnhu0257',
    date: '15 ngày trước',
    content: 'Until Dawn là phim kinh dị dược chuyển thể từ game kinh dị vô cùng ăn khách của Sony. Mất đến 10 năm trời, câu chuyện đen tối này mới có thể đến với các khán giả yêu phim.',
    image: news2,
  },
  {
    id: 3,
    title: 'Brad Pitt và 10 vai diễn đáng xem nhất',
    link: 'https://moveek.com/bai-viet/tong-hop-brad-pitt-va-10-vai-dien-dang-xem-nhat/27252',
    author: 'quanghuy1721',
    date: '1 ngày trước',
    content: 'Brad Pitt là một trong những diễn viên nổi tiếng nhất Hollywood, với nhiều vai diễn ấn tượng trong sự nghiệp của mình. Năm nay, nam diễn viên rất được yêu thích đã trở lại hoành tráng trong năm nay với Once Upon a Time in Hollywood và F1 The Movie.',
    image: news3,
  }
];

export default function NewsUpdatesPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const id = user?.id ?? "guest";

  return (
    <div className="bg-jet-black min-h-screen text-white flex">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <div className="flex-1 flex flex-col p-6">
          <Link to={`/${id}`} className="flex items-center gap-2 mb-8">
            <Film className="h-10 w-10 text-red-600" />
            <div className="text-3xl font-alfa text-red-500">CineBook</div>
          </Link>
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
                  <Link to={item.link} className="text-xl font-semibold">{item.title}</Link>
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