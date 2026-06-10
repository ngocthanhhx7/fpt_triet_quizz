import { philosopherAudioMap, philosopherSceneDesigns } from './philosopherSceneDesign'
import type { PhilosopherSceneDesign } from './philosopherSceneDesign'

export type PhilosopherAccent = 'cyan' | 'magenta' | 'neon' | 'violet' | 'sky' | 'amber' | 'emerald' | 'rose'

export interface PhilosopherDialogueLine {
  speaker: 'narrator' | 'philosopher' | 'student'
  text: string
}

export interface PhilosopherTimelineItem {
  id: string
  deepLinkId: string
  name: string
  sceneTitle: string
  era: string
  years: string
  tag: string
  summary: string
  storyOpening: string
  storyBeat: string
  dialogue: PhilosopherDialogueLine[]
  thesis: string
  context: string
  influence: string
  reflection: string
  quote: string
  voiceScript: string
  audioSrc: string
  visualMood: string
  connections: string[]
  riveSrc?: string
  portraitImage?: string
  sceneDesign: PhilosopherSceneDesign
  accent: PhilosopherAccent
}

export const philosophyTimeline: PhilosopherTimelineItem[] = [
  {
    id: 'socrates',
    deepLinkId: 'philosopher-socrates',
    name: 'Socrates',
    sceneTitle: 'Socrates - Đối thoại để tự biết mình',
    era: 'Cổ đại Hy Lạp',
    years: '469-399 TCN',
    tag: 'Mở đường',
    summary: 'Mở đầu truyền thống truy vấn bằng cách biến câu hỏi thành một phương pháp sống.',
    storyOpening:
      'Buổi sáng ở Athens không bắt đầu bằng bài giảng, mà bằng tiếng chân trên quảng trường đá. Socrates đi giữa thợ thủ công, thanh niên quý tộc và người bán hàng, chậm rãi hỏi từng người điều họ tưởng mình đã biết: công bằng là gì, can đảm là gì, sống tốt nghĩa là gì.',
    storyBeat:
      'Giữa quảng trường Athens, triết học hiện ra như một cuộc đối thoại sống: muốn sống đúng, trước hết phải đủ can đảm nhận ra mình chưa hiểu điều mình đang tin.',
    dialogue: [
      {
        speaker: 'student',
        text: 'Thưa Socrates, nếu thầy không đưa ra học thuyết cuối cùng, vì sao người ta vẫn tụ lại quanh thầy?',
      },
      {
        speaker: 'philosopher',
        text: 'Vì một câu hỏi đúng có thể làm linh hồn tỉnh dậy mạnh hơn một câu trả lời thuộc lòng.',
      },
      {
        speaker: 'narrator',
        text: 'Từ đó, triết học phương Tây học cách bắt đầu bằng tự vấn trước khi xây dựng hệ thống.',
      },
    ],
    thesis:
      'Tri thức chân chính bắt đầu từ việc biết mình chưa biết; đạo đức không nằm ở lời tuyên bố, mà ở đời sống được kiểm tra liên tục.',
    context:
      'Trong thành bang Athens sau chiến tranh và biến động chính trị, Socrates chống lại thói hùng biện rỗng bằng đối thoại, phản tỉnh và truy vấn đạo đức.',
    influence:
      'Đặt nền cho phương pháp biện luận, tư duy phê phán và đạo đức học phương Tây; qua Plato, tinh thần đối thoại của ông trở thành cửa ngõ của triết học cổ đại.',
    reflection:
      'Khi một niềm tin có vẻ quá hiển nhiên, hãy thử hỏi điều gì sẽ còn lại nếu ta phải giải thích nó thật chậm rãi cho người khác.',
    quote: 'Hãy tự biết mình.',
    voiceScript:
      'Mình bắt đầu bằng câu hỏi. Không phải để thắng cuộc tranh luận, mà để làm sáng điều đang mờ trong chính mình. Khi dám nhận ra mình chưa biết, mình mới thật sự học.',
    audioSrc: philosopherAudioMap.socrates,
    visualMood:
      'Quảng trường đá, ánh sáng vàng nhạt, vòng người đối thoại, bụi phấn và không khí truy vấn tỉnh thức.',
    connections: ['philosopher-plato'],
    sceneDesign: philosopherSceneDesigns.socrates,
    accent: 'cyan',
  },
  {
    id: 'plato',
    deepLinkId: 'philosopher-plato',
    name: 'Plato',
    sceneTitle: 'Plato - Đi tìm thế giới của ý niệm',
    era: 'Cổ đại Hy Lạp',
    years: '427-347 TCN',
    tag: 'Ý niệm',
    summary: 'Biến nỗi bất ổn của thế giới cảm giác thành hành trình đi tìm cái bền vững.',
    storyOpening:
      'Sau cái chết của Socrates, Plato mang vết thương của thành Athens vào một kiến trúc tư tưởng rộng lớn. Trong hang động của ông, con người nhìn bóng và tưởng đó là sự thật; phía ngoài hang, ánh sáng chói đến mức đau mắt nhưng mở ra một trật tự cao hơn.',
    storyBeat:
      'Từ bóng tối của hang động, Plato dựng một hành trình đi lên: linh hồn phải rời cái thấy quen thuộc để chạm tới hình thức bền vững của chân lý, thiện và đẹp.',
    dialogue: [
      {
        speaker: 'student',
        text: 'Nếu mọi thứ trước mắt đều thay đổi, ta có thể bám vào đâu để gọi là chân lý?',
      },
      {
        speaker: 'philosopher',
        text: 'Hãy nhìn qua cái bóng. Điều mắt thấy là dấu vết; điều trí tuệ nắm được mới cho ta chuẩn mực.',
      },
      {
        speaker: 'narrator',
        text: 'Plato biến ký ức về người thầy thành một thế giới nơi tư tưởng có hình dạng, bậc thang và ánh sáng riêng.',
      },
    ],
    thesis:
      'Thế giới cảm giác chỉ cho ta những hình ảnh đổi thay; tri thức cao hơn hướng về các ý niệm bền vững làm chuẩn cho mọi sự vật.',
    context:
      'Plato đối diện khủng hoảng đạo đức và chính trị của Athens bằng mô hình học viện, đối thoại và huyền thoại triết học như hang động.',
    influence:
      'Định hình truyền thống duy tâm khách quan, lý luận về hình thức và khát vọng xây dựng một trật tự chính trị dựa trên tri thức.',
    reflection:
      'Khi nhìn một hiện tượng, hãy hỏi: đây là bản thân sự thật, hay chỉ là cái bóng mà hoàn cảnh đang chiếu lên tường?',
    quote: 'Điều thấy bằng mắt chỉ là cái bóng.',
    voiceScript:
      'Những gì ta thấy chỉ là bề mặt. Phía sau nó còn một thế giới bền hơn, rõ hơn. Muốn học, ta phải quay người lại, chịu chói mắt, rồi bước ra khỏi hang quen thuộc.',
    audioSrc: philosopherAudioMap.plato,
    visualMood:
      'Hang động, bóng lửa, lối bậc sáng dần, hình học lơ lửng và cảm giác siêu hình tĩnh lặng.',
    connections: ['philosopher-socrates', 'philosopher-aristotle'],
    sceneDesign: philosopherSceneDesigns.plato,
    accent: 'violet',
  },
  {
    id: 'aristotle',
    deepLinkId: 'philosopher-aristotle',
    name: 'Aristotle',
    sceneTitle: 'Aristotle - Phân loại để hiểu thế giới',
    era: 'Cổ đại Hy Lạp',
    years: '384-322 TCN',
    tag: 'Lôgic',
    summary: 'Đưa triết học xuống gần sự vật cụ thể bằng quan sát, phân loại và lý giải nguyên nhân.',
    storyOpening:
      'Trong Lyceum, tư tưởng không chỉ bay lên trời ý niệm mà đi bộ giữa vườn cây, mẫu vật và cuộn giấy ghi chú. Aristotle nhìn một chiếc lá, một con vật, một hiến pháp, rồi hỏi: nó được làm từ gì, có hình thức nào, do đâu mà thành, và hướng tới mục đích gì?',
    storyBeat:
      'Sau Plato, trọng tâm chuyển xuống thế giới cụ thể: sự vật được hiểu bằng hình thức, chất liệu, nguyên nhân và mục đích của chính nó.',
    dialogue: [
      {
        speaker: 'student',
        text: 'Thầy có đang làm triết học khi phân loại cây cỏ và động vật không?',
      },
      {
        speaker: 'philosopher',
        text: 'Có. Vì trí tuệ bắt đầu khi ta biết phân biệt, gọi đúng tên và tìm nguyên nhân của điều đang hiện diện.',
      },
      {
        speaker: 'narrator',
        text: 'Ở Aristotle, thế giới trở thành một thư viện sống, nơi mỗi vật có vị trí trong trật tự hiểu biết.',
      },
    ],
    thesis:
      'Muốn hiểu sự vật phải xét hình thức, vật chất, nguyên nhân tác động và mục đích; tri thức cần logic để nối quan sát thành hệ thống.',
    context:
      'Từ di sản của Plato, Aristotle mở rộng triết học sang logic, sinh học, chính trị học, thi pháp và đạo đức học bằng tinh thần phân tích.',
    influence:
      'Đặt nền cho logic học, khoa học phân loại và truyền thống nghiên cứu thực nghiệm trong nhiều thế kỷ của triết học và khoa học phương Tây.',
    reflection:
      'Trước một vấn đề phức tạp, thử chia nó thành loại, nguyên nhân, chức năng và mục đích: thế giới thường sáng hơn khi được phân biệt cẩn thận.',
    quote: 'Biết là bắt đầu từ phân biệt.',
    voiceScript:
      'Muốn hiểu một điều, hãy gọi đúng tên nó, phân loại nó, rồi hỏi vì sao nó vận hành như vậy. Triết học không rời thế giới; nó học cách nhìn thế giới có trật tự hơn.',
    audioSrc: philosopherAudioMap.aristotle,
    visualMood:
      'Sơ đồ, mẫu vật, chú thích, bảng phân loại, ánh sáng xanh trong và nhịp quan sát chặt chẽ.',
    connections: ['philosopher-plato'],
    sceneDesign: philosopherSceneDesigns.aristotle,
    accent: 'sky',
  },
  {
    id: 'hegel',
    deepLinkId: 'philosopher-hegel',
    name: 'Hegel',
    sceneTitle: 'Hegel - Mâu thuẫn tạo nên vận động',
    era: 'Triết học Đức thế kỷ XIX',
    years: '1770-1831',
    tag: 'Biện chứng',
    summary: 'Nhìn lịch sử như một quá trình tự vận động qua phủ định, mâu thuẫn và thống nhất mới.',
    storyOpening:
      'Trong căn phòng làm việc phủ bóng nước mưa ở Berlin, Hegel không nhìn lịch sử như một đường thẳng yên ổn. Mỗi thời đại mang trong nó một vết nứt: điều đang tồn tại tự sinh ra giới hạn, bị phủ định, rồi được nâng lên trong một hình thức mới phức tạp hơn.',
    storyBeat:
      'Lịch sử không đi thẳng; nó tự đẩy mình bằng mâu thuẫn, phủ định và những lần thống nhất mới, như một đường xoắn đi qua xung đột.',
    dialogue: [
      {
        speaker: 'student',
        text: 'Vậy mâu thuẫn là sai lầm cần xóa bỏ, hay là dấu hiệu của sự sống?',
      },
      {
        speaker: 'philosopher',
        text: 'Mâu thuẫn là nhịp tim của vận động. Cái đang có chỉ hiểu được khi ta thấy nó đang trở thành cái khác.',
      },
      {
        speaker: 'narrator',
        text: 'Hegel trao cho triết học một sân khấu lớn: lịch sử, tinh thần và hiện thực cùng chuyển động trong biện chứng.',
      },
    ],
    thesis:
      'Tinh thần và lịch sử tự triển khai qua mâu thuẫn, phủ định và vượt bỏ; cái mới không đơn giản xóa cái cũ mà nâng nó lên trong một quan hệ khác.',
    context:
      'Trong bối cảnh châu Âu sau Cách mạng Pháp và thời đại Napoleon, Hegel tìm cách hiểu lịch sử như một tiến trình có lý tính nội tại.',
    influence:
      'Tạo khung biện chứng cho triết học hiện đại, ảnh hưởng mạnh tới chủ nghĩa duy tâm Đức, phê phán xã hội và cả bước ngoặt duy vật của Marx.',
    reflection:
      'Khi gặp một xung đột, đừng chỉ hỏi bên nào đúng; hãy hỏi mâu thuẫn đó đang bộc lộ giới hạn nào của cả hệ thống.',
    quote: 'Cái hợp lý là cái hiện thực.',
    voiceScript:
      'Mâu thuẫn không phá hỏng thế giới. Nó là cách thế giới tự chuyển động và tự lớn lên. Điều quan trọng là nhìn thấy quá trình, không chỉ nhìn một khoảnh khắc đứng im.',
    audioSrc: philosopherAudioMap.hegel,
    visualMood:
      'Đường xoắn, bản thảo bị gạch sửa, cửa sổ bão, tầng lớp đối lập và ánh sáng lạnh chuyển động.',
    connections: ['philosopher-feuerbach', 'philosopher-marx'],
    sceneDesign: philosopherSceneDesigns.hegel,
    accent: 'magenta',
  },
  {
    id: 'feuerbach',
    deepLinkId: 'philosopher-feuerbach',
    name: 'Feuerbach',
    sceneTitle: 'Feuerbach - Kéo triết học về con người',
    era: 'Triết học Đức thế kỷ XIX',
    years: '1804-1872',
    tag: 'Nhân bản',
    summary: 'Kéo triết học từ tinh thần trừu tượng trở về con người cảm tính, hữu hạn và có nhu cầu thật.',
    storyOpening:
      'Feuerbach bước vào triết học như người mở cửa sổ cho một căn phòng quá đầy khói siêu hình. Thay vì bắt đầu từ thần tính hay tinh thần tuyệt đối, ông đặt lên bàn những điều rất người: thân thể, tình yêu, nhu cầu, nỗi sợ, sự phụ thuộc và khát vọng được nhận ra.',
    storyBeat:
      'Từ phê phán tôn giáo, trọng tâm quay lại con người bằng xương thịt, với cảm giác, tình yêu và những nhu cầu không thể bị thay bằng khái niệm trừu tượng.',
    dialogue: [
      {
        speaker: 'student',
        text: 'Nếu con người tạo ra hình ảnh thần thánh, vậy ta học được gì từ hình ảnh ấy?',
      },
      {
        speaker: 'philosopher',
        text: 'Ta học chính những phẩm chất con người đã gửi ra ngoài mình: tình yêu, quyền năng, trí tuệ và khát vọng được hoàn thiện.',
      },
      {
        speaker: 'narrator',
        text: 'Feuerbach hạ triết học xuống mặt đất, để sau đó Marx có thể hỏi tiếp: con người ấy sống trong những quan hệ xã hội nào?',
      },
    ],
    thesis:
      'Tôn giáo là sự phóng chiếu những phẩm chất của con người; muốn hiểu thần học phải trở về nhân học và đời sống cảm tính.',
    context:
      'Feuerbach phê phán chủ nghĩa duy tâm Đức bằng cách đặt con người cụ thể, thân thể và cảm giác vào trung tâm của câu hỏi triết học.',
    influence:
      'Mở đường cho phê phán tôn giáo, chủ nghĩa duy vật nhân bản và tác động trực tiếp tới bước chuyển của Marx từ phê phán ý thức sang phê phán đời sống hiện thực.',
    reflection:
      'Khi một ý tưởng được đặt quá cao khỏi đời sống, hãy hỏi nó đang che giấu hay phóng chiếu nhu cầu nào của con người thật.',
    quote: 'Con người là trung tâm của câu hỏi.',
    voiceScript:
      'Nếu có điều gì bị thần thánh hóa, hãy nhìn lại con người đã tạo ra nó. Câu trả lời thường ở đó: trong thân thể, nhu cầu, tình yêu và đời sống cảm tính.',
    audioSrc: philosopherAudioMap.feuerbach,
    visualMood:
      'Phòng sáng ấm, chân dung người thật, chất liệu gỗ và giấy, cửa sổ đời sống thay cho biểu tượng xa vời.',
    connections: ['philosopher-hegel', 'philosopher-marx'],
    sceneDesign: philosopherSceneDesigns.feuerbach,
    accent: 'amber',
  },
  {
    id: 'marx',
    deepLinkId: 'philosopher-marx',
    name: 'Marx',
    sceneTitle: 'Marx - Từ giải thích đến cải biến',
    era: 'Thế kỷ XIX',
    years: '1818-1883',
    tag: 'Thực tiễn',
    summary: 'Gắn tư tưởng với lao động, sản xuất, quan hệ xã hội và khả năng biến đổi lịch sử.',
    storyOpening:
      'Ở Marx, triết học rời bàn viết để nghe tiếng máy, tiếng bước chân công nhân và tiếng sột soạt của sổ lương. Ông giữ lại sức mạnh biện chứng của Hegel, nhưng đặt nó xuống mặt đất: con người làm ra lịch sử trong những điều kiện vật chất không do họ tự chọn.',
    storyBeat:
      'Triết học bước vào xưởng máy, sổ lương và xung đột giai cấp; chân lý không chỉ được hiểu trong đầu mà được kiểm nghiệm trong thực tiễn xã hội.',
    dialogue: [
      {
        speaker: 'student',
        text: 'Vì sao chỉ giải thích thế giới là chưa đủ?',
      },
      {
        speaker: 'philosopher',
        text: 'Vì tư tưởng trở nên nghiêm túc khi nó chạm vào đời sống của những con người đang lao động, bị ràng buộc và có thể tự giải phóng.',
      },
      {
        speaker: 'narrator',
        text: 'Marx biến biện chứng thành phê phán vật chất của xã hội hiện đại, nơi sản xuất và quyền lực không thể tách rời.',
      },
    ],
    thesis:
      'Đời sống vật chất và quan hệ sản xuất quy định mạnh mẽ đời sống xã hội; triết học phải đi từ giải thích thế giới tới thực tiễn cải biến nó.',
    context:
      'Trong chủ nghĩa tư bản công nghiệp thế kỷ XIX, Marx phê phán kinh tế chính trị, tha hóa lao động và cấu trúc giai cấp của xã hội hiện đại.',
    influence:
      'Đặt nền cho chủ nghĩa duy vật lịch sử, phê phán kinh tế chính trị và các phong trào xã hội hướng tới giải phóng người lao động.',
    reflection:
      'Khi phân tích một ý tưởng, hãy hỏi nó gắn với điều kiện sống, lao động, lợi ích và quyền lực cụ thể nào.',
    quote: 'Thực tiễn là thước đo của chân lý.',
    voiceScript:
      'Tri thức không dừng ở việc hiểu. Nó chỉ hoàn tất khi chạm được vào đời sống và tạo ra thay đổi thật. Hãy nhìn vào lao động, sản xuất và những quan hệ làm nên xã hội.',
    audioSrc: philosopherAudioMap.marx,
    visualMood:
      'Xưởng máy, bản thảo, báo in, sổ lương, khói công nghiệp và những đường ghi chú xanh sáng như mạch phân tích.',
    connections: ['philosopher-hegel', 'philosopher-engels', 'philosopher-lenin'],
    sceneDesign: philosopherSceneDesigns.marx,
    accent: 'neon',
  },
  {
    id: 'engels',
    deepLinkId: 'philosopher-engels',
    name: 'Engels',
    sceneTitle: 'Engels - Nối triết học với khoa học và xã hội',
    era: 'Thế kỷ XIX',
    years: '1820-1895',
    tag: 'Hệ thống',
    summary: 'Làm rõ và phổ biến phép biện chứng duy vật như một cách nhìn liên hệ giữa tự nhiên, xã hội và tư duy.',
    storyOpening:
      'Engels nhìn thế giới như một bản đồ nhiều lớp: địa chất, sinh học, công nghiệp, thành phố công nhân và các cuộc tranh luận lý luận đều nối với nhau. Ông không chỉ là người đồng hành của Marx, mà còn là người giúp hệ thống hóa, bảo vệ và phổ biến một cách nhìn duy vật về vận động.',
    storyBeat:
      'Từ quan sát tự nhiên đến xã hội, Engels nối các mảnh rời thành một hệ thống duy vật: mọi sự vật tồn tại trong liên hệ, chuyển động và phát triển.',
    dialogue: [
      {
        speaker: 'student',
        text: 'Có thể dùng một lối nhìn biện chứng cho cả tự nhiên, xã hội và tư duy không?',
      },
      {
        speaker: 'philosopher',
        text: 'Có, nếu ta không biến nó thành công thức cứng. Điều cần thấy là quan hệ, chuyển hóa và vận động vật chất.',
      },
      {
        speaker: 'narrator',
        text: 'Engels làm cho lý luận trở nên có bản đồ: mỗi đường nối cho thấy thế giới không đứng riêng lẻ.',
      },
    ],
    thesis:
      'Tự nhiên, xã hội và tư duy đều vận động trong những mối liên hệ vật chất; phát triển diễn ra qua chuyển hóa, mâu thuẫn và quan hệ nội tại.',
    context:
      'Từ kinh nghiệm công nghiệp Manchester đến tranh luận khoa học tự nhiên, Engels mở rộng và trình bày hệ thống lý luận cùng Marx xây dựng.',
    influence:
      'Góp phần phổ biến, hệ thống hóa và bảo vệ nền tảng Mác-xít, đồng thời nối triết học với khoa học, phong trào công nhân và phân tích xã hội.',
    reflection:
      'Đừng nhìn một hiện tượng như một điểm cô lập; hãy vẽ các quan hệ vật chất khiến nó xuất hiện, vận động và biến đổi.',
    quote: 'Phát triển là kết quả của vận động nội tại.',
    voiceScript:
      'Không có gì đứng riêng lẻ. Tự nhiên, xã hội và tư duy đều nối với nhau bằng vận động vật chất. Muốn hiểu một sự vật, hãy nhìn mạng lưới quan hệ đang làm nó biến đổi.',
    audioSrc: philosopherAudioMap.engels,
    visualMood:
      'Bản đồ liên kết, ghim đồng, sơ đồ khoa học, phố công nghiệp sau mưa và cảm giác hệ thống đang mở rộng.',
    connections: ['philosopher-marx', 'philosopher-lenin'],
    sceneDesign: philosopherSceneDesigns.engels,
    accent: 'emerald',
  },
  {
    id: 'lenin',
    deepLinkId: 'philosopher-lenin',
    name: 'Lenin',
    sceneTitle: 'Lenin - Lý luận đi vào hành động',
    era: 'Đầu thế kỷ XX',
    years: '1870-1924',
    tag: 'Cách mạng',
    summary: 'Đưa lý luận Mác-xít vào điều kiện mới của tổ chức, chiến lược và hành động cách mạng.',
    storyOpening:
      'Trong căn phòng lạnh trước bình minh, bản đồ, điện tín và sách lý luận nằm cạnh nhau trên bàn. Với Lenin, tư tưởng không được phép chỉ là lời giải thích uyên bác; nó phải thành năng lực tổ chức, thành quyết định đúng thời điểm, thành con đường hành động trong khủng hoảng của thời đại.',
    storyBeat:
      'Khi lịch sử bước vào khủng hoảng, lý luận phải rời trang sách để đi vào tổ chức, chiến lược và hành động có kỷ luật.',
    dialogue: [
      {
        speaker: 'student',
        text: 'Lý luận có thể giúp gì trong một tình thế biến động quá nhanh?',
      },
      {
        speaker: 'philosopher',
        text: 'Nó giúp ta nhận ra điểm nút của thời đại, tổ chức lực lượng và hành động khi cơ hội lịch sử mở ra.',
      },
      {
        speaker: 'narrator',
        text: 'Ở Lenin, chủ nghĩa Mác bước vào thế kỷ mới với câu hỏi về đảng tiên phong, chiến lược và thực tiễn cách mạng.',
      },
    ],
    thesis:
      'Không có lý luận cách mạng thì không có phong trào cách mạng; lý luận chỉ sống khi được tổ chức thành thực tiễn có mục tiêu.',
    context:
      'Trong thời đại đế quốc chủ nghĩa, chiến tranh và khủng hoảng chính trị đầu thế kỷ XX, Lenin phát triển chiến lược cách mạng, vai trò tổ chức và phương pháp phân tích cụ thể.',
    influence:
      'Làm rõ sức mạnh tổ chức của tư duy Mác-xít trong điều kiện lịch sử mới, ảnh hưởng sâu rộng tới phong trào cách mạng và lý luận chính trị thế kỷ XX.',
    reflection:
      'Một ý tưởng muốn đi vào lịch sử cần nhiều hơn cảm hứng: nó cần phân tích cụ thể, tổ chức, thời điểm và trách nhiệm hành động.',
    quote: 'Lý luận chỉ sống khi đi vào hành động.',
    voiceScript:
      'Lý luận chỉ có sức nặng khi bước ra đời sống, dẫn đường cho quyết định và tổ chức hành động. Trong khủng hoảng, câu hỏi không chỉ là hiểu gì, mà là làm gì, với ai, vào lúc nào.',
    audioSrc: philosopherAudioMap.lenin,
    visualMood:
      'Bản đồ chiến lược, điện tín, ánh đèn đỏ thấp, cửa sổ mùa đông và nhịp quyết định khẩn trương.',
    connections: ['philosopher-marx', 'philosopher-engels'],
    sceneDesign: philosopherSceneDesigns.lenin,
    accent: 'rose',
  },
]

export const philosophyBadge = 'badge-triet-hoc'
