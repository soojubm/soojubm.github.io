import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'

// 설명 문구의 자릿수와 입력 칸 수를 한 값으로 맞춘다.
const codeLength = 6
const codeIndexes = Array.from({ length: codeLength }, (_, index) => index + 1)

const main = html`
  <fff-main width="narrow">
    <fff-flex direction="column" gap="12">
      <!-- 로그인 -->
      <fff-surface>
        <fff-auth-layout
          heading="Sign in to your account"
          description="Lorem Ipsum is simply dummy text."
        >
          <fff-social-auth-button provider="facebook"></fff-social-auth-button>
          <fff-separator variant="section">또는</fff-separator>

          <fff-form aria-label="로그인">
            <fff-form-fieldset aria-label="로그인 정보">
              <fff-textfield
                type="email"
                label="이메일"
                placeholder="soojubm@gmail.com"
              ></fff-textfield>
              <fff-passwordfield label="비밀번호" placeholder="8자리 이상">
                <fff-link slot="link" href="#">비밀번호를 잊으셨나요?</fff-link>
              </fff-passwordfield>
              <fff-checkbox name="remember">로그인 상태 유지</fff-checkbox>
            </fff-form-fieldset>

            <fff-textfield-validation>
              가입하지 않은 이메일이거나 잘못된 비밀번호입니다.
            </fff-textfield-validation>

            <fff-button variant="primary" size="large" full-width type="submit">로그인</fff-button>

            <fff-link-prompt
              centered
              message="계정이 없으신가요?"
              link-label="지금 가입하기"
              href="#"
            ></fff-link-prompt>
          </fff-form>
        </fff-auth-layout>
      </fff-surface>

      <!-- 회원가입 -->
      <fff-surface>
        <fff-auth-layout
          heading="Welcome!"
          description="Find your people. Engage your customers. Build your brand. Do it all with Mailchimp's Marketing Platform."
        >
          <fff-social-auth-button provider="facebook"></fff-social-auth-button>
          <fff-separator variant="section">또는</fff-separator>
          <fff-form aria-label="회원가입">
            <fff-form-fieldset aria-label="필수입력">
              <fff-textfield
                type="email"
                label="이메일"
                placeholder="soojubm@gmail.com"
              ></fff-textfield>
              <fff-passwordfield label="비밀번호" placeholder="8자리 이상"></fff-passwordfield>
            </fff-form-fieldset>

            <fff-form-fieldset aria-label="선택입력">
              <fff-textfield label="닉네임" placeholder="수줍이" optional></fff-textfield>
              <fff-textfield label="출생년도" placeholder="출생년도" optional></fff-textfield>
              <fff-form-field label="성별" optional>
                <fff-gender-selector stretch></fff-gender-selector>
              </fff-form-field>
            </fff-form-fieldset>

            <fff-form-fieldset aria-label="약관 동의">
              <fff-text as="strong" weight="bold">
                회원가입 시
                <fff-link href="#">이용약관</fff-link>
                과
                <fff-link href="#">개인정보처리방침</fff-link>
                에 동의하는 것으로 간주합니다.
              </fff-text>
              <fff-terms-agreement
                name="terms"
                .options=${[
                  { value: 'terms', label: '이용약관 동의' },
                  { value: 'privacy', label: '개인정보처리방침에 동의합니다.' },
                  { value: 'marketing', label: '[선택] 광고성 정보 수신 동의' },
                ]}
              ></fff-terms-agreement>
            </fff-form-fieldset>

            <fff-button variant="primary" size="large" full-width type="submit" disabled>
              이메일 주소로 가입
            </fff-button>
          </fff-form>
        </fff-auth-layout>
      </fff-surface>

      <!-- 비밀번호 재설정 요청 -->
      <fff-surface>
        <fff-auth-layout
          heading="Reset Your Password"
          description="비밀번호가 기억이 안 나세요? 걱정 말아요! 임시 비밀번호를 이메일로 보내드릴게요."
        >
          <fff-form aria-label="비밀번호 재설정 요청">
            <fff-textfield label="이메일 주소" placeholder="soojubm@gmail.com"></fff-textfield>
            <fff-button type="submit" variant="primary" size="large">재설정 메일 받기</fff-button>
            <fff-link-prompt
              message="이메일을 받지 못하셨나요?"
              link-label="알아보기"
              href="#"
            ></fff-link-prompt>
          </fff-form>
        </fff-auth-layout>
      </fff-surface>

      <!-- 새 비밀번호 입력 -->
      <fff-surface>
        <fff-auth-layout
          heading="비밀번호 재설정"
          description="Enter your email to receive a password reset link"
        >
          <fff-form aria-label="새 비밀번호 설정">
            <fff-form-fieldset aria-label="새 비밀번호">
              <fff-passwordfield label="새 비밀번호"></fff-passwordfield>
              <fff-passwordfield label="새 비밀번호 확인"></fff-passwordfield>
            </fff-form-fieldset>

            <fff-button type="submit" variant="primary" size="large">비밀번호 변경</fff-button>
          </fff-form>
        </fff-auth-layout>
      </fff-surface>

      <!-- 이메일 인증 코드 입력 -->
      <fff-surface>
        <fff-auth-layout
          centered
          heading="Please check your email!"
          description="${codeLength}자리 인증 코드를 입력해주세요."
        >
          <fff-form aria-label="이메일 인증">
            <fff-flex aria-label="인증 코드" gap="2" stretch>
              ${codeIndexes.map(
                index => html`
                  <fff-textfield type="number" name="code${index}"></fff-textfield>
                `,
              )}
            </fff-flex>
            <fff-link-prompt
              message="인증번호를 받지 못했나요?"
              link-label="인증번호 재전송"
              href="#"
            ></fff-link-prompt>
          </fff-form>
        </fff-auth-layout>
      </fff-surface>
    </fff-flex>
  </fff-main>
`

renderPage(main, { closeSidebar: true })
