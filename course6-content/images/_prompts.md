# C5 썸네일 이미지 생성 프롬프트 명세

> 이 파일은 **명세만** 담습니다. 실제 이미지 생성은 하지 않습니다.
> 비주얼 디자이너(팀원)가 `codex-image` 업무 매뉴얼로 아래 프롬프트를 병렬 생성할 때 사용합니다.
> 대상 브랜드: 제로 슈거 스파클링 음료 **"제로톡"** (예시 데이터 · 가상 브랜드)

## 아트 디렉션 (SSOT 고정 · 3안 공통)

- 비율: **16:9** (SNS 썸네일 베이스 프레임)
- 스타일: 플랫 에디토리얼 벡터, 깔끔하고 세련된 광고 비주얼
- 팔레트 통일: Ink Navy `#1E293B` / Signal Coral `#FF6B4A` / Fresh Teal `#2DD4BF` / Paper White `#F8FAFC`
- **이미지 내 텍스트 배제** — 글자·로고·숫자·워터마크 없음. 썸네일 문구(제목·자막)는 나중에 편집 단계에서 얹습니다. (오탈자 방지)
- 3안은 서로 다른 컨셉이되 같은 팔레트로 한 세트처럼 보이게 합니다.

## 프롬프트 3안

> 형식: `파일명 :: 프롬프트`

c5-thumb-01.png :: Flat editorial vector illustration, 16:9. Extreme close-up of a single sparkling zero-sugar canned beverage standing on a clean surface, cold condensation droplets and rising carbonation bubbles catching the light, crisp refreshing mood. Strict color palette limited to ink navy #1E293B, signal coral #FF6B4A, fresh teal #2DD4BF, and paper white #F8FAFC background. Soft studio lighting, subtle long shadow, generous negative space on one side. Absolutely no text, no letters, no numbers, no logos, no watermark anywhere in the image. High-end advertising thumbnail aesthetic, clean minimal composition.

c5-thumb-02.png :: Flat editorial vector illustration, 16:9. Bright summer lifestyle scene — a young hand holding a sparkling zero-sugar beverage can at a sunny poolside, out-of-focus palm leaves and shimmering water in the background, relaxed carefree vacation vibe. Strict color palette limited to ink navy #1E293B, signal coral #FF6B4A, fresh teal #2DD4BF, and paper white #F8FAFC. Warm airy daylight, soft gradients, cheerful energetic composition with open space for later caption overlay. Absolutely no text, no letters, no numbers, no logos, no watermark anywhere in the image. Premium social-media advertising look.

c5-thumb-03.png :: Flat editorial vector illustration, 16:9. Bold graphic color-block background with a single sparkling zero-sugar beverage can centered as a hero object, dynamic diagonal shapes and playful bursting bubbles radiating outward, punchy pop-art energy. Strict color palette limited to ink navy #1E293B, signal coral #FF6B4A, fresh teal #2DD4BF, and paper white #F8FAFC. Strong high-contrast composition, confident modern advertising style, balanced negative space for later text overlay. Absolutely no text, no letters, no numbers, no logos, no watermark anywhere in the image.

## 생성 후 점검 (제작자 자가 체크)

- [ ] 3개 파일이 0바이트·손상 없이 생성됨 (실패분만 재생성)
- [ ] 세 이미지가 같은 팔레트로 한 세트처럼 보임
- [ ] 이미지 안에 글자가 하나도 없음 (있으면 재생성)
- [ ] 파일명 정확: c5-thumb-01.png / c5-thumb-02.png / c5-thumb-03.png
