import { html } from 'lit'

import { renderLayout } from '@/components/layouts/base-layouts'

const codeInputs = [1, 2, 3, 4]

const main = html`
  <style>
    .authentication {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
      width: 100%;
      max-width: var(--layout-width-narrow);
      margin: 0 auto;
    }

    .authentication fieldset,
    .authentication footer {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .authentication footer {
      gap: var(--space-6);
    }

    /* 인증 코드 입력은 로그인·가입 흐름과 구분되도록 가운데 정렬한다. */
    .authentication[name='verify'] {
      align-items: center;
      text-align: center;
    }
  </style>

  <main class="page">
    <mm-flex direction="column" gap="12">
      <!-- 로그인 -->
      <form class="authentication" name="login" novalidate>
        <mm-text-block
          level="2"
          heading="Sign in to your account"
          description="Lorem Ipsum is simply dummy text."
        ></mm-text-block>

        <fieldset>
          <mm-button size="large" full-width>페이스북으로 시작</mm-button>
          <mm-separator scope="element">
            <mm-paragraph slot="text">또는</mm-paragraph>
          </mm-separator>
          <mm-textfield type="email" label="이메일" placeholder="soojubm@gmail.com"></mm-textfield>
          <mm-passwordfield label="비밀번호" placeholder="8자리 이상">
            <mm-link slot="link" href="forgot.html">비밀번호를 잊으셨나요?</mm-link>
          </mm-passwordfield>
          <mm-checkbox name="remember">로그인 상태 유지</mm-checkbox>
        </fieldset>

        <mm-textfield-validation>
          가입하지 않은 이메일이거나 잘못된 비밀번호입니다.
        </mm-textfield-validation>

        <footer>
          <mm-button variant="primary" size="large" full-width type="submit">로그인</mm-button>
          <mm-flex justify-content="center" gap="2">
            계정이 없으신가요?
            <mm-link href="signup.html">지금 가입하기</mm-link>
          </mm-flex>
        </footer>
      </form>

      <!-- 회원가입 -->
      <form class="authentication" name="signup">
        <mm-text-block
          level="2"
          heading="Welcome!"
          description="Find your people. Engage your customers. Build your brand. Do it all with Mailchimp's Marketing Platform."
        ></mm-text-block>
        <mm-link href="#">Log in</mm-link>

        <fieldset>
          <legend hidden>필수입력</legend>
          <mm-button size="large" full-width>페이스북으로 시작</mm-button>
          <mm-separator>
            <mm-paragraph slot="text">또는</mm-paragraph>
          </mm-separator>
          <mm-textfield type="email" label="이메일" placeholder="soojubm@gmail.com"></mm-textfield>
          <mm-passwordfield label="비밀번호" placeholder="8자리 이상"></mm-passwordfield>
        </fieldset>

        <fieldset>
          <legend hidden>선택입력</legend>
          <mm-textfield label="닉네임" placeholder="수줍이" optional></mm-textfield>
          <mm-textfield label="출생년도" placeholder="출생년도" optional></mm-textfield>
          <mm-form-field label="성별" optional>
            <mm-gender-selector stretch></mm-gender-selector>
          </mm-form-field>
        </fieldset>

        <fieldset>
          <legend hidden>약관 동의</legend>
          <strong>
            회원가입 시
            <mm-link href="#">이용약관</mm-link>
            과
            <mm-link href="#">개인정보처리방침</mm-link>
            에 동의하는 것으로 간주합니다.
          </strong>
          <mm-master-checkbox aria-controls="signup-terms-group">
            <mm-paragraph>모두 동의합니다.</mm-paragraph>
          </mm-master-checkbox>

          <mm-checkbox-group id="signup-terms-group" name="terms">
            <mm-checkbox size="large" value="terms">이용약관 동의</mm-checkbox>
            <mm-checkbox size="large" value="privacy">개인정보처리방침에 동의합니다.</mm-checkbox>
            <mm-checkbox size="large" value="marketing">[선택] 광고성 정보 수신 동의</mm-checkbox>
          </mm-checkbox-group>
        </fieldset>

        <footer>
          <mm-button variant="primary" size="large" full-width type="submit" disabled>
            이메일 주소로 가입
          </mm-button>
        </footer>
      </form>

      <!-- 비밀번호 재설정 요청 -->
      <form class="authentication" name="password">
        <mm-text-block
          level="2"
          heading="Reset Your Password"
          description="비밀번호가 기억이 안 나세요? 걱정 말아요! 임시 비밀번호를 이메일로 보내드릴게요."
        ></mm-text-block>

        <fieldset>
          <mm-textfield label="이메일 주소" placeholder="soojubm@gmail.com"></mm-textfield>
        </fieldset>

        <footer>
          <mm-button type="submit" variant="primary" size="large">재설정 메일 받기</mm-button>
        </footer>

        <aside>
          <mm-paragraph>
            이메일을 받지 못하셨나요?
            <mm-link href="">알아보기</mm-link>
          </mm-paragraph>
        </aside>
      </form>

      <!-- 새 비밀번호 입력 -->
      <form class="authentication" name="password-reset">
        <mm-text-block
          level="2"
          heading="비밀번호 재설정"
          description="Enter your email to receive a password reset link"
        ></mm-text-block>

        <fieldset>
          <mm-passwordfield label="새 비밀번호"></mm-passwordfield>
          <mm-passwordfield label="새 비밀번호 확인"></mm-passwordfield>
        </fieldset>

        <footer>
          <mm-button type="submit" variant="primary" size="large">비밀번호 변경</mm-button>
        </footer>
      </form>

      <!-- 이메일 인증 코드 입력 -->
      <form class="authentication" name="verify">
        <mm-text-block
          level="2"
          centered
          heading="Please check your email!"
          description="6자리 인증 코드를 입력해주세요."
        ></mm-text-block>
        <mm-link href="signin.html">인증번호 재전송</mm-link>

        <mm-flex direction="row" justify-content="center">
          ${codeInputs.map(
            index => html`
              <mm-textfield
                type="number"
                name="code${index}"
                maxlength="1"
                style="width: var(--size-48)"
              ></mm-textfield>
            `,
          )}
        </mm-flex>
      </form>
    </mm-flex>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main, { closeSidebar: true })
})
