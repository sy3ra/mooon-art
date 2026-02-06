import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Mooon Art',
    description: 'Artist statement and biography of Moon Young-seo.',
};

export default function AboutPage() {
    return (
        <div className="max-w-xl mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-24">
            <div className="flex flex-col items-center mb-16">
                <h1 className="text-3xl font-bold uppercase tracking-widest">About</h1>
            </div>

            <div className="space-y-8 text-base md:text-md leading-loose text-gray-600 font-medium tracking-wide break-keep text-justify">
                <p>
                    문영서는 사라지는 순간이 남기는 감각과 정서에 주목하는 회화 작가이다.
                    자연을 선명한 장면으로 재현하기보다, 빛과 공기의 층, 그림자처럼 유동적인 현상을 통해 이미 지나간 순간의 잔향을 화면에 남긴다.
                </p>

                <p>
                    작업은 일본 미학의 ‘아와레(あはれ)’ 개념에서 출발한다.
                    흐린 화면과 에어브러시 기법은 대상을 명확히 규정하기보다, 보는 이의 시선을 늦추고 감각에 머물게 하는 장치로 작동한다.
                    관람자는 무엇을 보고 있는지 단정하기보다, 화면 속에 남은 감정의 여운을 천천히 더듬게 된다.
                </p>

                <p>
                    그의 회화는 현재의 풍경을 보여주기보다, 사라진 순간 이후에 남는 애틋함과 기억의 층위를 불러온다.
                    작가는 사라짐을 부정하지 않고, 그 이후에 남는 감정을 오래 바라보는 태도를 회화적 언어로 풀어낸다.
                </p>
            </div>

            <div className="flex flex-col items-center mt-24">
                <div className="w-12 h-px bg-gray-300 mb-8"></div>
                <div className="text-xs text-gray-400 tracking-widest uppercase">
                    Artist Moon Young-seo
                </div>
            </div>
        </div>
    );
}
