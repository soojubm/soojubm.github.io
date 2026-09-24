import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'

// 설명 문구의 자릿수와 입력 칸 수를 한 값으로 맞춘다.
const codeLength = 6
const codeIndexes = Array.from({ length: codeLength }, (_, index) => index + 1)

const main = html`
  <mm-main width="narrow">
    <mm-flex direction="column" gap="12">
      <!-- 로그인 -->
      <mm-flex direction="column" gap="6">
        <mm-text-block
          level="2"
          heading="Sign in to your account"
          description="Lorem Ipsum is simply dummy text."
        ></mm-text-block>

        <!-- 구분선이 자기 여백으로 소셜 로그인과 form을 나누므로 gap을 두지 않는다. -->
        <mm-flex direction="column">
          <mm-social-auth-button
            provider="facebook"
            size="large"
            full-width
          ></mm-social-auth-button>
          <mm-separator variant="section">또는</mm-separator>

          <form name="login" aria-label="로그인" novalidate>
            <mm-flex direction="column" gap="4">
              <mm-flex direction="column" gap="3">
                <mm-textfield
                  type="email"
                  label="이메일"
                  placeholder="soojubm@gmail.com"
                ></mm-textfield>
                <mm-passwordfield label="비밀번호" placeholder="8자리 이상">
                  <mm-link slot="link" href="forgot.html">비밀번호를 잊으셨나요?</mm-link>
                </mm-passwordfield>
                <mm-checkbox name="remember">로그인 상태 유지</mm-checkbox>
              </mm-flex>

              <mm-textfield-validation>
                가입하지 않은 이메일이거나 잘못된 비밀번호입니다.
              </mm-textfield-validation>

              <mm-button variant="primary" size="large" full-width type="submit">로그인</mm-button>
            </mm-flex>
          </form>
        </mm-flex>

        <mm-flex justify-content="center" gap="2">
          계정이 없으신가요?
          <mm-link href="signup.html">지금 가입하기</mm-link>
        </mm-flex>
      </mm-flex>

      <!-- 회원가입 -->
      <mm-flex direction="column" gap="6">
        <mm-text-block
          level="2"
          heading="Welcome!"
          description="Find your people. Engage your customers. Build your brand. Do it all with Mailchimp's Marketing Platform."
        ></mm-text-block>

        <!-- 구분선이 자기 여백으로 소셜 로그인과 form을 나누므로 gap을 두지 않는다. -->
        <mm-flex direction="column">
          <mm-social-auth-button
            provider="facebook"
            size="large"
            full-width
          ></mm-social-auth-button>
          <mm-separator variant="section">또는</mm-separator>

          <form name="signup" aria-label="회원가입">
            <mm-flex direction="column" gap="4">
              <fieldset>
                <legend hidden>필수입력</legend>
                <mm-flex direction="column" gap="3">
                  <mm-textfield
                    type="email"
                    label="이메일"
                    placeholder="soojubm@gmail.com"
                  ></mm-textfield>
                  <mm-passwordfield label="비밀번호" placeholder="8자리 이상"></mm-passwordfield>
                </mm-flex>
              </fieldset>

              <fieldset>
                <legend hidden>선택입력</legend>
                <mm-flex direction="column" gap="3">
                  <mm-textfield label="닉네임" placeholder="수줍이" optional></mm-textfield>
                  <mm-textfield label="출생년도" placeholder="출생년도" optional></mm-textfield>
                  <mm-form-field label="성별" optional>
                    <mm-gender-selector stretch></mm-gender-selector>
                  </mm-form-field>
                </mm-flex>
              </fieldset>

              <fieldset>
                <legend hidden>약관 동의</legend>
                <mm-flex direction="column" gap="3">
                  <mm-text as="strong" weight="bold">
                    회원가입 시
                    <mm-link href="#">이용약관</mm-link>
                    과
                    <mm-link href="#">개인정보처리방침</mm-link>
                    에 동의하는 것으로 간주합니다.
                  </mm-text>
                  <mm-terms-agreement
                    name="terms"
                    .options=${[
                      { value: 'terms', label: '이용약관 동의' },
                      { value: 'privacy', label: '개인정보처리방침에 동의합니다.' },
                      { value: 'marketing', label: '[선택] 광고성 정보 수신 동의' },
                    ]}
                  ></mm-terms-agreement>
                </mm-flex>
              </fieldset>

              <mm-button variant="primary" size="large" full-width type="submit" disabled>
                이메일 주소로 가입
              </mm-button>
            </mm-flex>
          </form>
        </mm-flex>

        <mm-flex justify-content="center" gap="2">
          이미 계정이 있으신가요?
          <mm-link href="#">Log in</mm-link>
        </mm-flex>
      </mm-flex>

      <!-- 비밀번호 재설정 요청 -->
      <mm-flex direction="column" gap="6">
        <mm-text-block
          level="2"
          heading="Reset Your Password"
          description="비밀번호가 기억이 안 나세요? 걱정 말아요! 임시 비밀번호를 이메일로 보내드릴게요."
        ></mm-text-block>

        <form name="password" aria-label="비밀번호 재설정 요청">
          <mm-flex direction="column" gap="4">
            <mm-textfield label="이메일 주소" placeholder="soojubm@gmail.com"></mm-textfield>

            <mm-button type="submit" variant="primary" size="large">재설정 메일 받기</mm-button>
          </mm-flex>
        </form>

        <aside>
          <mm-paragraph>
            이메일을 받지 못하셨나요?
            <mm-link href="">알아보기</mm-link>
          </mm-paragraph>
        </aside>
      </mm-flex>

      <!-- 새 비밀번호 입력 -->
      <mm-flex direction="column" gap="6">
        <mm-text-block
          level="2"
          heading="비밀번호 재설정"
          description="Enter your email to receive a password reset link"
        ></mm-text-block>

        <form name="password-reset" aria-label="새 비밀번호 설정">
          <mm-flex direction="column" gap="4">
            <mm-flex direction="column" gap="3">
              <mm-passwordfield label="새 비밀번호"></mm-passwordfield>
              <mm-passwordfield label="새 비밀번호 확인"></mm-passwordfield>
            </mm-flex>

            <mm-button type="submit" variant="primary" size="large">비밀번호 변경</mm-button>
          </mm-flex>
        </form>
      </mm-flex>

      <!-- 이메일 인증 코드 입력 -->
      <mm-flex direction="column" gap="6">
        <mm-text-block
          level="2"
          centered
          heading="Please check your email!"
          description="${codeLength}자리 인증 코드를 입력해주세요."
        ></mm-text-block>

        <form name="verify" aria-label="이메일 인증">
          <mm-flex aria-label="인증 코드" gap="2" stretch>
            ${codeIndexes.map(
              index => html`
                <mm-textfield type="number" name="code${index}"></mm-textfield>
              `,
            )}
          </mm-flex>
        </form>

        <mm-flex justify-content="center">
          <mm-link href="signin.html">인증번호 재전송</mm-link>
        </mm-flex>
      </mm-flex>
    </mm-flex>
  </mm-main>
`

renderPage(main, { closeSidebar: true })
