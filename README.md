# 🎨 Mooon Art - 개인 포트폴리오 웹사이트

> **Mooon Art**는 아티스트의 고유한 작품과 전시 정보를 세련되게 전달하기 위해 최적화된 포트폴리오 웹 애플리케이션입니다. 

## 📝 프로젝트 개요
- **프로젝트 명**: Mooon Art
- **분류**: 웹 애플리케이션 (포트폴리오 & 전시 소개)
- **개발 인원**: 1인 (풀스택 구현)
- **배포 주소**: Vercel을 통한 배포



## 🛠 기술 스택 (Tech Stack)

### Frontend
- **Next.js (App Router)**: 최신 React 기능인 서버 컴포넌트(RSC)를 활용한 SEO 최적화 및 렌더링 성능 향상.

### Backend & Database
- **Supabase**: 작품(Artwork) 데이터 관리 및 API 구축.

### Deployment & Tools
- **Vercel**: GitHub 저장소 연동을 통한 자동화 배포 환경 구축.
- **Git / GitHub**: 버전 관리 및 소스 코드 백업.



## 🎯 주요 기능 및 특징 (Key Features)

### 1. 반응형 UI/UX 및 차별화된 레이아웃 전략
- **적응형 디자인**: 사용자의 기기(Mobile / Desktop) 여부에 따라 다른 레이아웃을 제공합니다.
  - **모바일**: 화면 전체를 채우는 몰입형 오버레이(Full Screen Overlay) 이미지 캐러셀 제공.
  - **데스크탑**: 텍스트(소개형)와 이미지 영역을 나누는 스플릿 스크린(Split Screen) 레이아웃 적용. 
- **애니메이션 효과**: 로딩 시 시선을 이끄는 페이드인(Fade-in) 및 슬라이딩 타이포그래피 애니메이션 적용. 

### 2. 관리자 페이지 (Admin Dashboard) 구축
- **보안 라우팅**: `/admin/login`을 통한 클라이언트 사이드 인증 구현 및 `localStorage`를 활용한 세션 관리.
- **작품 관리 도구**: 일반 사용자가 보는 프론트 영역과 분리하여, 관리자만 비밀번호로 접근한 뒤 Supabase DB 내의 작품 리스트(CRUD)를 컨트롤 할 수 있는 대시보드 시스템 마련.

### 3. 상태 관리 (State Management)
- **React Context API**: `ArtworkContext`를 생성하여 Supabase에서 Fetch한 데이터를 전역(Global)에서 캐싱. 페이지를 넘나들 때 불필요한 중복 API 호출을 방지하고 빠른 렌더링 체감 속도를 보장합니다.



## 💡 기술적 고민 및 해결 (Trouble Shooting)

**1. 효과적인 데이터 불러오기 (Data Fetching)**
- 일반 갤러리 웹사이트 특성상 고화질 이미지 리소스와 데이터가 많이 로드됩니다. Next.js의 App Router의 특성을 살려 CSR(Client-Side Rendering)가 꼭 필요한 Context 영역에서는 최소화하고, 초기 로딩 속도 최적화를 위해 Vercel의 `next/image`를 사용해 이미지 로딩과 캐싱을 자동화했습니다.

**2. Supabase 연동 및 보안**
- 환경 변수(`.env.local`) 처리를 통해 깃허브(GitHub) 등 외부에 데이터베이스 토큰 값이 노출되지 않도록 설정하였으며, Vercel 배포 시 환경 변수를 따로 안전하게 주입해 보안 요건을 충족시켰습니다.



## 📁 디렉토리 구조 (Directory Structure)

```text
mooon-art-next/
├── src/
│   ├── app/
│   │   ├── admin/       # 관리자 페이지 및 로그인 라우트
│   │   ├── about/       # 정보 라우트
│   │   ├── exhibition/  # 전시 라우트
│   │   ├── products/    # 작품 리스트 라우트
│   │   ├── layout.tsx   # 최상위 레이아웃
│   │   └── page.tsx     # 메인 랜딩 페이지
│   ├── components/      # 재사용 가능한 UI 컴포넌트 목록
│   ├── context/         # ArtworkContext (전역 상태)
│   └── lib/             # Supabase 설정 등 연동 모듈
├── public/              # 정적 로컬 이미지 에셋 (assets/)
├── .env.local           # 환경변수 (보안)
└── package.json         # 모듈 및 프로젝트 정보
```
