# C3 키비주얼 이미지 생성 명세 (codex-image)

> 이 문서는 **이미지 생성 명세**입니다. 여기서는 이미지를 생성하지 않고, 생성 시 사용할 프롬프트만 정의합니다.
> 생성 도구: **codex-image** (병렬 최대 5장, 텍스트 배제). 산출: `c3-keyvisual-01.png` ~ `c3-keyvisual-04.png`.

## 고정 아트 디렉션 (SSOT — 모든 안 공통, 반드시 준수)

- **비율:** 16:9
- **스타일:** flat editorial / advertising visual, clean vector-leaning, soft studio lighting
- **통일 팔레트:** navy `#1E293B`, coral `#FF6B4A`, teal `#2DD4BF`, off-white `#F8FAFC` (이 4색만 지배색으로)
- **이미지 내 텍스트 배제:** NO text, NO letters, NO logos, NO typography, NO numbers anywhere (오탈자 방지)
- **제품:** 제로톡 = 제로 슈거 스파클링 음료. 캔/음료는 **라벨·글자 없는 무지(無地) 일반 캔** 형태(coral+teal 색면만)
- **세트 일관성:** 4안 모두 같은 팔레트·같은 광고 톤으로 시리즈처럼 보이게

아래 고정 접미사(shared suffix)를 모든 프롬프트 끝에 붙인다:

```
Shared style suffix ::
16:9 flat editorial advertising key visual, unified palette of navy #1E293B, coral #FF6B4A, teal #2DD4BF and off-white #F8FAFC only, soft clean lighting, plain unbranded beverage can with NO text, absolutely no text, no letters, no logos, no numbers, no typography anywhere, cohesive summer campaign series look.
```

---

## 키비주얼 4안 프롬프트

| 파일명 | 프롬프트 |
|---|---|
| `c3-keyvisual-01.png` | A refreshing summer beach key visual: a plain unbranded sparkling-drink can standing in the lower third, cold water droplets splashing around it, cobalt-and-teal sea and bright sky behind, a subtle coral sunset accent, low camera angle conveying cool refreshment. + [Shared style suffix] |
| `c3-keyvisual-02.png` | A minimal product-hero key visual: a single plain unbranded sparkling-drink can centered on a clean off-white background, one soft light source, gentle navy shadow and a teal highlight on the can, lots of negative space, premium and honest "zero sugar" feel. + [Shared style suffix] |
| `c3-keyvisual-03.png` | A lively lifestyle key visual: a cheerful rooftop summer gathering, several hands reaching in with plain unbranded sparkling-drink cans, warm afternoon tone, coral clothing accents and teal props, mid-shot capturing a share-worthy joyful moment. + [Shared style suffix] |
| `c3-keyvisual-04.png` | A bold graphic key visual: large flat color-blocks of navy, coral and teal with a diagonal flow of carbonation bubbles, a plain unbranded sparkling-drink can silhouette in front, off-white negative space, punchy pop poster look that pops as a social thumbnail. + [Shared style suffix] |

---

## 생성 후 검증 체크리스트

- [ ] 4개 파일 모두 생성됨(`c3-keyvisual-01.png` ~ `04.png`), 0바이트·손상 없음(`ls -l`/`file`로 확인)
- [ ] 이미지 내 글자·로고·숫자 없음(텍스트 배제 원칙)
- [ ] 4안 팔레트가 통일되어 시리즈처럼 보임
- [ ] 각 안의 컨셉(청량해변 / 미니멀 / 라이프스타일 / 그래픽)이 구분됨
- [ ] 실패한 안만 재생성(전체 재생성 금지)
