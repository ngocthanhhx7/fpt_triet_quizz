import type {
  Chapter,
  Flashcard,
  GameDefinition,
  GameProgress,
  GameResult,
  HistoryFlowStep,
  LearningModule,
  PairMatchItem,
  QuizQuestion,
  SourceRef,
} from './learningTypes'

const docName = 'Giáo trình Triết học Mác-Lênin (PDF)'

const source = (pages: string, note?: string): SourceRef => ({
  document: docName,
  pages,
  note,
})

export const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    title: 'Khái luận về triết học và triết học Mác-Lênin',
    summary:
      'Mở khóa cách đặt câu hỏi triết học: thế giới là gì, con người đứng ở đâu, tư duy và tồn tại liên hệ ra sao.',
    learningOutcomes: [
      'Nhận ra nguồn gốc, đối tượng và vai trò của triết học.',
      'Phân biệt duy vật, duy tâm, khả tri luận và bất khả tri luận.',
      'Hiểu vì sao triết học Mác-Lênin là thế giới quan và phương pháp luận.',
    ],
    moduleIds: ['c1-m1', 'c1-m2', 'c1-m3', 'c1-m4'],
    theme: {
      accent: '#6FFF00',
      gradient: 'from-lime-300 via-cyan-300 to-sky-500',
      worldName: 'Cổng Thế Giới Quan',
    },
  },
  {
    id: 'chapter-2',
    title: 'Chủ nghĩa duy vật biện chứng',
    summary:
      'Học cách nhìn sự vật trong liên hệ, vận động và phát triển: vật chất, ý thức, các nguyên lý, phạm trù, quy luật và nhận thức.',
    learningOutcomes: [
      'Giải thích quan hệ vật chất - ý thức theo lập trường duy vật biện chứng.',
      'Vận dụng hai nguyên lý, sáu cặp phạm trù và ba quy luật cơ bản.',
      'Hiểu vai trò của thực tiễn trong quá trình nhận thức.',
    ],
    moduleIds: ['c2-m1', 'c2-m2', 'c2-m3', 'c2-m4', 'c2-m5', 'c2-m6', 'c2-m7'],
    theme: {
      accent: '#00F0FF',
      gradient: 'from-cyan-300 via-fuchsia-400 to-violet-600',
      worldName: 'Mê Cung Biện Chứng',
    },
  },
  {
    id: 'chapter-3',
    title: 'Chủ nghĩa duy vật lịch sử',
    summary:
      'Đọc xã hội như một hệ thống đang vận động: sản xuất vật chất, lực lượng sản xuất, quan hệ xã hội, nhà nước, ý thức và con người.',
    learningOutcomes: [
      'Thấy vai trò nền tảng của sản xuất vật chất trong đời sống xã hội.',
      'Phân tích các quan hệ LLSX-QHSX, CSHT-KTTT, TTXH-YTXH.',
      'Liên hệ triết học về con người với học tập, lao động và cộng đồng.',
    ],
    moduleIds: ['c3-m1', 'c3-m2', 'c3-m3', 'c3-m4', 'c3-m5', 'c3-m6', 'c3-m7'],
    theme: {
      accent: '#FFB000',
      gradient: 'from-amber-300 via-orange-500 to-rose-600',
      worldName: 'Thành Phố Lịch Sử',
    },
  },
]

export const modules: LearningModule[] = [
  {
    id: 'c1-m1',
    chapterId: 'chapter-1',
    title: 'Nhập môn triết học',
    coreIdeas: [
      'Triết học xuất hiện khi con người cần lý giải thế giới ở mức khái quát nhất.',
      'Triết học là hệ thống quan điểm chung về thế giới và vị trí của con người trong thế giới.',
      'Học triết không chỉ nhớ định nghĩa mà học cách đặt câu hỏi sâu hơn.',
    ],
    keyTerms: [
      { term: 'Triết học', meaning: 'Hệ thống quan điểm lý luận chung nhất về thế giới và con người.' },
      { term: 'Thế giới quan', meaning: 'Cách con người hình dung và định hướng trước thế giới.' },
      { term: 'Phương pháp luận', meaning: 'Hệ nguyên tắc định hướng cách nhận thức và hành động.' },
    ],
    commonMistakes: ['Tưởng triết học chỉ là học thuộc câu chữ, không liên quan đời sống.'],
    sourcePages: '2-3',
  },
  {
    id: 'c1-m2',
    chapterId: 'chapter-1',
    title: 'Vấn đề cơ bản của triết học',
    coreIdeas: [
      'Vấn đề cơ bản xoay quanh quan hệ giữa vật chất và ý thức.',
      'Mặt thứ nhất hỏi cái nào có trước; mặt thứ hai hỏi con người có nhận thức được thế giới không.',
      'Cách trả lời tạo nên các lập trường duy vật, duy tâm, khả tri hoặc bất khả tri.',
    ],
    keyTerms: [
      { term: 'Duy vật', meaning: 'Cho rằng vật chất có trước và quyết định ý thức.' },
      { term: 'Duy tâm', meaning: 'Đề cao tinh thần, ý thức hoặc ý niệm như cái có trước.' },
      { term: 'Khả tri luận', meaning: 'Tin rằng con người có thể nhận thức thế giới.' },
    ],
    commonMistakes: ['Lẫn duy vật với lối sống thực dụng hoặc coi nhẹ tinh thần.'],
    sourcePages: '3-4',
  },
  {
    id: 'c1-m3',
    chapterId: 'chapter-1',
    title: 'Biện chứng và siêu hình',
    coreIdeas: [
      'Biện chứng nhìn sự vật trong liên hệ, vận động, chuyển hóa và phát triển.',
      'Siêu hình thường xem sự vật cô lập, đứng im hoặc thay đổi chỉ về lượng.',
      'Trong học tập, tư duy biện chứng giúp thấy nguyên nhân, điều kiện và quá trình.',
    ],
    keyTerms: [
      { term: 'Biện chứng', meaning: 'Cách nhìn sự vật trong mối liên hệ và sự vận động phát triển.' },
      { term: 'Siêu hình', meaning: 'Cách nhìn sự vật tách rời, cứng nhắc, ít chú ý chuyển hóa.' },
      { term: 'Phát triển', meaning: 'Sự vận động theo khuynh hướng tạo cái mới.' },
    ],
    commonMistakes: ['Cho rằng biện chứng chỉ là nói hai mặt của vấn đề mà không phân tích quan hệ.'],
    sourcePages: '4-5',
  },
  {
    id: 'c1-m4',
    chapterId: 'chapter-1',
    title: 'Vai trò triết học Mác-Lênin',
    coreIdeas: [
      'Triết học Mác-Lênin kế thừa tinh hoa triết học và gắn với thực tiễn xã hội.',
      'Nó cung cấp thế giới quan duy vật biện chứng và phương pháp luận khoa học.',
      'Với sinh viên, giá trị nằm ở năng lực phân tích vấn đề thực tiễn có hệ thống.',
    ],
    keyTerms: [
      { term: 'Thế giới quan duy vật biện chứng', meaning: 'Cách nhìn thế giới vật chất trong vận động và liên hệ.' },
      { term: 'Chức năng phương pháp luận', meaning: 'Định hướng cách suy nghĩ và hành động trước vấn đề.' },
      { term: 'Thực tiễn', meaning: 'Hoạt động vật chất có mục đích của con người trong xã hội.' },
    ],
    commonMistakes: ['Học triết như môn tách rời khỏi lịch sử, xã hội và nghề nghiệp.'],
    sourcePages: '5-8',
  },
  {
    id: 'c2-m1',
    chapterId: 'chapter-2',
    title: 'Vật chất và phương thức tồn tại',
    coreIdeas: [
      'Vật chất là thực tại khách quan, tồn tại không phụ thuộc vào cảm giác của ta.',
      'Vận động là phương thức tồn tại của vật chất; không có vật chất đứng yên tuyệt đối.',
      'Không gian và thời gian là hình thức tồn tại của vật chất đang vận động.',
    ],
    keyTerms: [
      { term: 'Vật chất', meaning: 'Thực tại khách quan được cảm giác phản ánh.' },
      { term: 'Vận động', meaning: 'Mọi biến đổi nói chung của sự vật và quá trình.' },
      { term: 'Không gian - thời gian', meaning: 'Hình thức tồn tại của vật chất.' },
    ],
    commonMistakes: ['Đồng nhất vật chất với một vật thể cụ thể như cái bàn hoặc chiếc laptop.'],
    sourcePages: '8-11',
  },
  {
    id: 'c2-m2',
    chapterId: 'chapter-2',
    title: 'Nguồn gốc và bản chất ý thức',
    coreIdeas: [
      'Ý thức có nguồn gốc tự nhiên từ bộ não và thế giới khách quan.',
      'Ý thức có nguồn gốc xã hội từ lao động, ngôn ngữ và giao tiếp.',
      'Ý thức không chụp ảnh máy móc hiện thực mà phản ánh sáng tạo hiện thực.',
    ],
    keyTerms: [
      { term: 'Ý thức', meaning: 'Sự phản ánh năng động, sáng tạo thế giới khách quan vào bộ óc người.' },
      { term: 'Lao động', meaning: 'Hoạt động xã hội góp phần hình thành ý thức người.' },
      { term: 'Ngôn ngữ', meaning: 'Vỏ vật chất của tư duy, giúp lưu giữ và truyền đạt ý thức.' },
    ],
    commonMistakes: ['Coi ý thức là thứ bí ẩn hoàn toàn tách khỏi đời sống vật chất và xã hội.'],
    sourcePages: '11-12',
  },
  {
    id: 'c2-m3',
    chapterId: 'chapter-2',
    title: 'Quan hệ vật chất - ý thức',
    coreIdeas: [
      'Vật chất quyết định ý thức, nhưng ý thức có tính độc lập tương đối.',
      'Ý thức có thể tác động trở lại hiện thực thông qua hoạt động thực tiễn.',
      'Phương pháp luận: tôn trọng khách quan, đồng thời phát huy vai trò chủ động của con người.',
    ],
    keyTerms: [
      { term: 'Tôn trọng khách quan', meaning: 'Xuất phát từ điều kiện thực tế thay vì mong muốn chủ quan.' },
      { term: 'Tính năng động của ý thức', meaning: 'Khả năng định hướng, dự báo và tổ chức hành động.' },
      { term: 'Chủ quan duy ý chí', meaning: 'Áp đặt ý muốn lên thực tế, bỏ qua điều kiện khách quan.' },
    ],
    commonMistakes: ['Hiểu “vật chất quyết định” thành phủ nhận hoàn toàn vai trò tư duy và kế hoạch.'],
    sourcePages: '12-13',
  },
  {
    id: 'c2-m4',
    chapterId: 'chapter-2',
    title: 'Hai nguyên lý phép biện chứng',
    coreIdeas: [
      'Nguyên lý mối liên hệ phổ biến yêu cầu xem sự vật trong hệ quan hệ của nó.',
      'Nguyên lý phát triển yêu cầu thấy khuynh hướng vận động, mâu thuẫn và cái mới.',
      'Ứng dụng: đừng đánh giá deadline, điểm số hoặc teamwork bằng một lát cắt đơn lẻ.',
    ],
    keyTerms: [
      { term: 'Mối liên hệ phổ biến', meaning: 'Các sự vật tác động, quy định và chuyển hóa lẫn nhau.' },
      { term: 'Nguyên lý phát triển', meaning: 'Sự vật luôn vận động theo khuynh hướng tạo ra cái mới.' },
      { term: 'Quan điểm toàn diện', meaning: 'Xem xét nhiều mặt, nhiều quan hệ của đối tượng.' },
    ],
    commonMistakes: ['Nói “mọi thứ liên quan” nhưng không chỉ ra liên quan nào quan trọng.'],
    sourcePages: '13-14',
  },
  {
    id: 'c2-m5',
    chapterId: 'chapter-2',
    title: 'Sáu cặp phạm trù cơ bản',
    coreIdeas: [
      'Các cặp phạm trù giúp nhận diện quan hệ nền tảng giữa các mặt của sự vật.',
      'Ví dụ: cái riêng - cái chung, nguyên nhân - kết quả, nội dung - hình thức.',
      'Dùng phạm trù đúng giúp tránh phân tích rời rạc hoặc nhầm biểu hiện với bản chất.',
    ],
    keyTerms: [
      { term: 'Cái riêng - cái chung', meaning: 'Một sự vật cụ thể và những thuộc tính lặp lại ở nhiều sự vật.' },
      { term: 'Nguyên nhân - kết quả', meaning: 'Quan hệ tạo ra biến đổi và biến đổi được tạo ra.' },
      { term: 'Bản chất - hiện tượng', meaning: 'Mối liên hệ giữa tầng sâu ổn định và biểu hiện bên ngoài.' },
    ],
    commonMistakes: ['Thấy hiện tượng nổi bật rồi kết luận ngay đó là bản chất.'],
    sourcePages: '14-19',
  },
  {
    id: 'c2-m6',
    chapterId: 'chapter-2',
    title: 'Ba quy luật cơ bản',
    coreIdeas: [
      'Lượng - chất cho thấy tích lũy đến điểm nút sẽ tạo bước nhảy.',
      'Mâu thuẫn là nguồn gốc vận động và phát triển của sự vật.',
      'Phủ định của phủ định mô tả khuynh hướng phát triển có kế thừa.',
    ],
    keyTerms: [
      { term: 'Điểm nút', meaning: 'Giới hạn mà khi vượt qua sẽ làm chất thay đổi.' },
      { term: 'Mâu thuẫn', meaning: 'Sự thống nhất và đấu tranh giữa các mặt đối lập.' },
      { term: 'Phủ định biện chứng', meaning: 'Xóa bỏ có kế thừa, tạo điều kiện cho cái mới.' },
    ],
    commonMistakes: ['Hiểu “phủ định” là xóa sạch mọi thứ cũ, không còn kế thừa.'],
    sourcePages: '19-23',
  },
  {
    id: 'c2-m7',
    chapterId: 'chapter-2',
    title: 'Lý luận nhận thức',
    coreIdeas: [
      'Nhận thức là quá trình phản ánh hiện thực, đi từ cảm tính đến lý tính và quay về thực tiễn.',
      'Thực tiễn là cơ sở, động lực, mục đích và tiêu chuẩn kiểm nghiệm chân lý.',
      'Học tốt cần thử, sai, sửa và kiểm chứng bằng hoạt động thực tế.',
    ],
    keyTerms: [
      { term: 'Nhận thức cảm tính', meaning: 'Tri thức trực tiếp qua cảm giác, tri giác, biểu tượng.' },
      { term: 'Nhận thức lý tính', meaning: 'Tri thức qua khái niệm, phán đoán, suy luận.' },
      { term: 'Chân lý', meaning: 'Tri thức phù hợp với hiện thực và được thực tiễn kiểm nghiệm.' },
    ],
    commonMistakes: ['Tưởng đọc lý thuyết là đủ, không cần kiểm chứng hoặc vận dụng.'],
    sourcePages: '23-27',
  },
  {
    id: 'c3-m1',
    chapterId: 'chapter-3',
    title: 'Sản xuất vật chất và xã hội',
    coreIdeas: [
      'Sản xuất vật chất là cơ sở cho sự tồn tại và phát triển của xã hội.',
      'Con người không chỉ thích nghi với tự nhiên mà cải biến tự nhiên thông qua lao động.',
      'Cách xã hội sản xuất ảnh hưởng sâu đến tổ chức đời sống xã hội.',
    ],
    keyTerms: [
      { term: 'Sản xuất vật chất', meaning: 'Hoạt động tạo ra của cải đáp ứng nhu cầu sống của xã hội.' },
      { term: 'Phương thức sản xuất', meaning: 'Cách kết hợp lực lượng sản xuất với quan hệ sản xuất.' },
      { term: 'Lao động xã hội', meaning: 'Hoạt động có mục đích của con người trong cộng đồng.' },
    ],
    commonMistakes: ['Xem lịch sử chỉ là câu chuyện của ý tưởng mà bỏ qua nền tảng sản xuất.'],
    sourcePages: '27-28',
  },
  {
    id: 'c3-m2',
    chapterId: 'chapter-3',
    title: 'LLSX và QHSX',
    coreIdeas: [
      'Lực lượng sản xuất thể hiện năng lực thực tiễn của con người trong sản xuất.',
      'Quan hệ sản xuất là quan hệ giữa người với người trong quá trình sản xuất.',
      'QHSX cần phù hợp với trình độ phát triển của LLSX để thúc đẩy xã hội.',
    ],
    keyTerms: [
      { term: 'LLSX', meaning: 'Người lao động, tư liệu sản xuất, tri thức và kỹ năng sản xuất.' },
      { term: 'QHSX', meaning: 'Quan hệ sở hữu, tổ chức quản lý và phân phối sản phẩm.' },
      { term: 'Phù hợp', meaning: 'Sự tương thích động, tạo điều kiện cho LLSX phát triển.' },
    ],
    commonMistakes: ['Nghĩ phù hợp là đứng yên, trong khi nó luôn thay đổi theo trình độ LLSX.'],
    sourcePages: '28-30',
  },
  {
    id: 'c3-m3',
    chapterId: 'chapter-3',
    title: 'CSHT, KTTT và hình thái kinh tế - xã hội',
    coreIdeas: [
      'Cơ sở hạ tầng là toàn bộ quan hệ sản xuất hợp thành kết cấu kinh tế xã hội.',
      'Kiến trúc thượng tầng gồm nhà nước, pháp luật, tư tưởng và thiết chế tương ứng.',
      'Sự phát triển xã hội là quá trình lịch sử - tự nhiên, nhưng có vai trò hoạt động của con người.',
    ],
    keyTerms: [
      { term: 'CSHT', meaning: 'Kết cấu kinh tế của xã hội trong một giai đoạn nhất định.' },
      { term: 'KTTT', meaning: 'Thiết chế và tư tưởng xã hội hình thành trên cơ sở kinh tế.' },
      { term: 'Hình thái KTXH', meaning: 'Xã hội ở một giai đoạn với LLSX, QHSX và KTTT tương ứng.' },
    ],
    commonMistakes: ['Hiểu máy móc rằng KTTT chỉ bị động, không tác động trở lại CSHT.'],
    sourcePages: '30-34',
  },
  {
    id: 'c3-m4',
    chapterId: 'chapter-3',
    title: 'Giai cấp, dân tộc và nhân loại',
    coreIdeas: [
      'Giai cấp gắn với vị trí khác nhau trong hệ thống sản xuất xã hội.',
      'Dân tộc là cộng đồng người ổn định với quan hệ kinh tế, lãnh thổ, ngôn ngữ và văn hóa.',
      'Quan hệ giai cấp - dân tộc - nhân loại cần được nhìn trong sự thống nhất và khác biệt.',
    ],
    keyTerms: [
      { term: 'Giai cấp', meaning: 'Những tập đoàn người khác nhau về vị trí trong sản xuất xã hội.' },
      { term: 'Dân tộc', meaning: 'Cộng đồng người ổn định hình thành trong lịch sử.' },
      { term: 'Nhân loại', meaning: 'Cộng đồng rộng lớn của con người với lợi ích chung toàn cầu.' },
    ],
    commonMistakes: ['Tách rời lợi ích dân tộc khỏi bối cảnh nhân loại và điều kiện xã hội cụ thể.'],
    sourcePages: '34-37',
  },
  {
    id: 'c3-m5',
    chapterId: 'chapter-3',
    title: 'Nhà nước và cách mạng xã hội',
    coreIdeas: [
      'Nhà nước xuất hiện khi xã hội phân chia giai cấp và mâu thuẫn cần một quyền lực đặc biệt.',
      'Bản chất nhà nước gắn với quyền lực chính trị của giai cấp nhất định.',
      'Cách mạng xã hội là bước chuyển sâu sắc khi mâu thuẫn xã hội chín muồi.',
    ],
    keyTerms: [
      { term: 'Nhà nước', meaning: 'Tổ chức quyền lực chính trị đặc biệt của xã hội có giai cấp.' },
      { term: 'Cách mạng xã hội', meaning: 'Sự biến đổi căn bản về chất trong đời sống xã hội.' },
      { term: 'Quyền lực công cộng', meaning: 'Quyền lực tách khỏi xã hội và có bộ máy cưỡng chế.' },
    ],
    commonMistakes: ['Đồng nhất mọi cải cách nhỏ với cách mạng xã hội.'],
    sourcePages: '37-40',
  },
  {
    id: 'c3-m6',
    chapterId: 'chapter-3',
    title: 'Tồn tại xã hội và ý thức xã hội',
    coreIdeas: [
      'Tồn tại xã hội là đời sống vật chất và điều kiện sinh hoạt của xã hội.',
      'Ý thức xã hội phản ánh tồn tại xã hội nhưng có tính độc lập tương đối.',
      'Ý thức xã hội có thể lạc hậu, vượt trước hoặc kế thừa qua thời gian.',
    ],
    keyTerms: [
      { term: 'TTXH', meaning: 'Toàn bộ sinh hoạt vật chất và điều kiện sống của xã hội.' },
      { term: 'YTXH', meaning: 'Đời sống tinh thần và cách xã hội tự nhận thức về mình.' },
      { term: 'Tính độc lập tương đối', meaning: 'Khả năng vận động riêng của ý thức xã hội so với tồn tại xã hội.' },
    ],
    commonMistakes: ['Nghĩ ý thức xã hội thay đổi ngay lập tức khi điều kiện vật chất thay đổi.'],
    sourcePages: '40-42',
  },
  {
    id: 'c3-m7',
    chapterId: 'chapter-3',
    title: 'Triết học về con người',
    coreIdeas: [
      'Con người là thực thể sinh học - xã hội, vừa do tự nhiên vừa do lịch sử tạo nên.',
      'Bản chất con người không cô lập mà là tổng hòa các quan hệ xã hội trong lịch sử cụ thể.',
      'Giải phóng con người gắn với khắc phục tha hóa và phát triển tự do của mỗi người.',
    ],
    keyTerms: [
      { term: 'Bản chất con người', meaning: 'Tổng hòa các quan hệ xã hội trong điều kiện lịch sử cụ thể.' },
      { term: 'Tha hóa', meaning: 'Tình trạng sản phẩm hoặc quan hệ do con người tạo ra quay lại chi phối con người.' },
      { term: 'Quần chúng nhân dân', meaning: 'Lực lượng sáng tạo lịch sử trong hoạt động thực tiễn.' },
    ],
    commonMistakes: ['Xem con người chỉ như cá nhân tách rời cộng đồng và lịch sử.'],
    sourcePages: '42-46',
  },
]

export const flashcards: Flashcard[] = modules.flatMap((module) =>
  module.keyTerms.slice(0, 2).map((item, index) => ({
    id: `${module.id}-f${index + 1}`,
    moduleId: module.id,
    front: item.term,
    back: item.meaning,
    type: index === 0 ? 'term' : index === 1 ? 'idea' : 'example',
    difficulty: index === 2 ? 'medium' : 'easy',
    tags: [module.chapterId, module.title],
    sourceRef: source(module.sourcePages, 'Paraphrase từ tài liệu PDF lưu hành nội bộ.'),
  })),
)

const quizSeeds: Array<Omit<QuizQuestion, 'sourceRef'>> = modules.flatMap((module) => [
  {
    id: `${module.id}-q1`,
    moduleId: module.id,
    type: 'single',
    stem: `Ý chính nào mô tả đúng nhất module “${module.title}”?`,
    choices: [module.coreIdeas[0], module.commonMistakes[0], 'Chỉ cần học thuộc thuật ngữ là đủ.', 'Mọi hiện tượng đều đứng yên và tách biệt.'],
    answer: 0,
    explanation: module.coreIdeas[0],
    difficulty: 'easy',
    tags: [module.chapterId, module.title],
  },
  {
    id: `${module.id}-q2`,
    moduleId: module.id,
    type: 'scenario',
    stem: `Một nhóm sinh viên FPT muốn vận dụng “${module.title}” vào học tập. Hành động nào hợp lý nhất?`,
    choices: [
      'Nhìn vấn đề theo điều kiện, quan hệ và quá trình cụ thể rồi mới chọn cách làm.',
      'Chọn đáp án nghe hay nhất dù không kiểm tra thực tế.',
      'Tách vấn đề khỏi bối cảnh để kết luận thật nhanh.',
      'Bỏ qua phản hồi vì lý thuyết luôn đúng tuyệt đối.',
    ],
    answer: 0,
    explanation: 'Tinh thần chung là biến kiến thức thành phương pháp phân tích tình huống cụ thể, không học thuộc máy móc.',
    difficulty: 'medium',
    tags: [module.chapterId, 'ứng dụng'],
  },
  {
    id: `${module.id}-q3`,
    moduleId: module.id,
    type: 'true-false',
    stem: `Nhận định nào là lỗi hay gặp khi học “${module.title}”?`,
    choices: [module.commonMistakes[0], module.coreIdeas[1], module.coreIdeas[2], module.keyTerms[0].meaning],
    answer: 0,
    explanation: `Sai ở chỗ: ${module.commonMistakes[0]} Hãy quay lại ý chính: ${module.coreIdeas[1]}`,
    difficulty: 'medium',
    tags: [module.chapterId, 'common-mistake'],
  },
])

export const quizQuestions: QuizQuestion[] = quizSeeds.map((question) => {
  const module = modules.find((item) => item.id === question.moduleId)

  return {
    ...question,
    sourceRef: source(module?.sourcePages ?? '2-46', 'Câu hỏi được biên soạn lại từ ý chính của tài liệu.'),
  }
})

export const gameDefinitions: GameDefinition[] = [
  {
    id: 'hanh-trinh-bien-chung',
    title: 'Hành Trình Biện Chứng',
    description: 'Platformer Canvas 3 world, mở rương bằng quiz để nhận vật phẩm và vượt cổng tri thức.',
    chapterIds: ['chapter-1', 'chapter-2', 'chapter-3'],
    difficulty: 'medium',
    estimatedMinutes: 8,
  },
  {
    id: 'ghep-cap-pham-tru',
    title: 'Ghép Cặp Phạm Trù',
    description: 'Memory puzzle ghép thuật ngữ với định nghĩa, ví dụ với khái niệm và các cặp phạm trù.',
    chapterIds: ['chapter-1', 'chapter-2'],
    difficulty: 'easy',
    estimatedMinutes: 4,
  },
  {
    id: 'dong-chay-lich-su',
    title: 'Dòng Chảy Lịch Sử',
    description: 'Timeline/branching quiz giúp đọc xã hội qua sản xuất vật chất, quan hệ xã hội và con người.',
    chapterIds: ['chapter-3'],
    difficulty: 'medium',
    estimatedMinutes: 6,
  },
]

export const initialGameProgress: GameProgress = {
  saveVersion: 1,
  unlockedStages: ['chapter-1', 'c1-m1', 'hanh-trinh-bien-chung'],
  bestScores: {},
  badges: [],
  answeredQuestionIds: [],
  inventory: {},
  lastPlayedAt: null,
}

export const gameResults: GameResult[] = []

const curatedPairMatchItems: PairMatchItem[] = [
  {
    id: 'pair-1a',
    pairId: 'pair-1',
    label: 'Duy vật',
    match: 'Vật chất có trước và quyết định ý thức',
    moduleId: 'c1-m2',
    explanation: 'Đây là lập trường trả lời mặt thứ nhất của vấn đề cơ bản theo hướng vật chất là cái có trước.',
  },
  {
    id: 'pair-2a',
    pairId: 'pair-2',
    label: 'Biện chứng',
    match: 'Nhìn sự vật trong liên hệ và phát triển',
    moduleId: 'c1-m3',
    explanation: 'Tư duy biện chứng không cô lập đối tượng khỏi quan hệ và quá trình vận động.',
  },
  {
    id: 'pair-3a',
    pairId: 'pair-3',
    label: 'Vật chất',
    match: 'Thực tại khách quan được cảm giác phản ánh',
    moduleId: 'c2-m1',
    explanation: 'Khái niệm nhấn mạnh tính khách quan, không phụ thuộc cảm giác chủ quan.',
  },
  {
    id: 'pair-4a',
    pairId: 'pair-4',
    label: 'Điểm nút',
    match: 'Ngưỡng lượng đổi làm chất đổi',
    moduleId: 'c2-m6',
    explanation: 'Tích lũy lượng đến giới hạn nhất định sẽ tạo bước nhảy về chất.',
  },
  {
    id: 'pair-5a',
    pairId: 'pair-5',
    label: 'LLSX',
    match: 'Năng lực thực tiễn của con người trong sản xuất',
    moduleId: 'c3-m2',
    explanation: 'Lực lượng sản xuất gồm người lao động, tư liệu, tri thức và kỹ năng.',
  },
  {
    id: 'pair-6a',
    pairId: 'pair-6',
    label: 'CSHT',
    match: 'Kết cấu kinh tế của xã hội',
    moduleId: 'c3-m3',
    explanation: 'Cơ sở hạ tầng là nền kinh tế xã hội ở một giai đoạn cụ thể.',
  },
  {
    id: 'pair-7a',
    pairId: 'pair-7',
    label: 'YTXH',
    match: 'Đời sống tinh thần của xã hội',
    moduleId: 'c3-m6',
    explanation: 'Ý thức xã hội phản ánh tồn tại xã hội nhưng có vận động tương đối độc lập.',
  },
  {
    id: 'pair-8a',
    pairId: 'pair-8',
    label: 'Tha hóa',
    match: 'Sản phẩm hoặc quan hệ quay lại chi phối con người',
    moduleId: 'c3-m7',
    explanation: 'Khái niệm giúp nhìn các quan hệ xã hội khiến con người mất quyền làm chủ.',
  },
]

export const pairMatchItems: PairMatchItem[] = [
  ...curatedPairMatchItems,
  ...modules.flatMap((module) =>
    module.keyTerms.map((item, index) => ({
      id: `${module.id}-term-pair-${index + 1}`,
      pairId: `${module.id}-term-pair-${index + 1}`,
      label: item.term,
      match: item.meaning,
      moduleId: module.id,
      explanation: `${item.term}: ${item.meaning} Ghi nhớ trong bài "${module.title}": ${module.coreIdeas[0]}`,
    })),
  ),
]

export const historyFlowSteps: HistoryFlowStep[] = [
  {
    id: 'flow-1',
    title: 'Sản xuất vật chất',
    description: 'Con người tạo ra điều kiện sống và từ đó mở ra toàn bộ đời sống xã hội.',
    moduleId: 'c3-m1',
  },
  {
    id: 'flow-2',
    title: 'Lực lượng sản xuất phát triển',
    description: 'Kỹ năng, công cụ, tri thức và người lao động tạo năng lực sản xuất mới.',
    moduleId: 'c3-m2',
  },
  {
    id: 'flow-3',
    title: 'Quan hệ sản xuất cần phù hợp',
    description: 'Cách sở hữu, quản lý và phân phối phải tương thích với trình độ LLSX.',
    moduleId: 'c3-m2',
  },
  {
    id: 'flow-4',
    title: 'CSHT tác động KTTT',
    description: 'Nền kinh tế xã hội định hình thiết chế, pháp luật, tư tưởng và văn hóa.',
    moduleId: 'c3-m3',
  },
  {
    id: 'flow-5',
    title: 'Con người sáng tạo lịch sử',
    description: 'Quần chúng và cá nhân hành động trong điều kiện cụ thể để thúc đẩy xã hội.',
    moduleId: 'c3-m7',
  },
]

export const learningContent = {
  chapters,
  modules,
  flashcards,
  quizQuestions,
  gameDefinitions,
  pairMatchItems,
  historyFlowSteps,
  initialGameProgress,
  gameResults,
}

export const getModuleById = (moduleId: string) => modules.find((module) => module.id === moduleId)

export const getQuestionsByChapter = (chapterId: Chapter['id']) =>
  quizQuestions.filter((question) => getModuleById(question.moduleId)?.chapterId === chapterId)
