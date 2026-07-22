import { html } from 'lit'
import { renderDocumentLayout } from '../../../layouts/document-layout'

const main = html`
  <main class="page">
    <mm-flex direction="column" gap="16">
      <mm-page-header
        heading="Tokens"
        description="제품의 시각 언어를 구성하는 원자 값입니다. 색상, 글꼴, 간격, 크기, 형태, 레이어, 모션을 토큰으로 관리해 컴포넌트와 패턴이 같은 기준을 공유하게 합니다."
      ></mm-page-header>

      <mm-text-block
        level="3"
        heading="토큰 카테고리: Base(Dimension/Surface) / State"
        description="토큰은 크게 정적인 값을 담는 Base와 인터랙션에
      따라 적용되는 State로 나뉘며, Base는 다시 크기·간격의 Dimension과 재질·표면의 Surface로
      구분됩니다."
      ></mm-text-block>

      <mm-text-block
        level="3"
        heading="토큰 구조"
        description="토큰은 프리미티브와 시멘틱 계층으로 구성됩니다. 프리미티브 토큰은 디자인의 기본 값을
    정의하고, 시멘틱 토큰은 이를 인터페이스의 역할에 매핑합니다. 프리미티브 토큰은 color-, size-,
    space-와 같이 값의 종류를 기준으로 명명하며, 시멘틱 토큰은 background-color, border-color,
    body-font-size처럼 역할과 용도를 기준으로 명명합니다. 이를 통해 토큰의 출처와 목적을 명확하게
    구분할 수 있습니다."
      ></mm-text-block>

      <style>
        .token-color-markers {
          display: flex;
          width: min(100%, calc(var(--size-80) * 6));
        }

        .token-color-marker {
          display: flex;
          justify-content: center;
          flex: 1 1 0;
          min-width: var(--size-32);
        }
      </style>

      <mm-flex direction="column" gap="0">
        <mm-text-block level="2" heading="Color" description="TODO..."></mm-text-block>

        <mm-grid columns="6">
          <mm-color-token color="var(--gray0)" token="gray0: #fff"></mm-color-token>
          <mm-color-token color="var(--gray100)" token="gray100: #f5f6f5"></mm-color-token>
          <mm-color-token color="var(--gray200)" token="gray200: #d2d7d5"></mm-color-token>
          <mm-color-token color="var(--gray400)" token="gray400: #8a908d"></mm-color-token>
          <mm-color-token color="var(--gray800)" token="gray800: #303b35"></mm-color-token>
          <mm-color-token color="var(--green100)" token="green100: green tint"></mm-color-token>
          <mm-color-token color="var(--green800)" token="green800: #1b995c"></mm-color-token>
          <mm-color-token color="var(--red100)" token="red100: red tint"></mm-color-token>
          <mm-color-token color="var(--red800)" token="red800: #f02849"></mm-color-token>
        </mm-grid>
        <!-- <mm-grid
          columns="6"
          style="margin-top: var(--space-3)"
          aria-label="semantic color tokens"
        ></mm-grid> -->

        <mm-separator></mm-separator>
        <mm-grid columns="4" aria-label="grayscale color tokens">
          <mm-color-token
            color="var(--color-primary)"
            on-color="var(--foreground-color-on-primary)"
            label="on primary"
            token="primary: green800"
          ></mm-color-token>
          <mm-color-token
            color="var(--green100)"
            on-color="var(--foreground-color)"
            label="on primary-light"
            token="primary-light: green100"
          ></mm-color-token>
          <!-- warning -->
          <mm-color-token
            color="var(--red100)"
            on-color="var(--foreground-color-on-warning)"
            label="on warning-light"
            token="warning-light: red100"
          ></mm-color-token>
          <mm-color-token
            color="var(--red800)"
            on-color="var(--foreground-color-on-solid)"
            label="on warning"
            token="warning: red800"
          ></mm-color-token>
        </mm-grid>

        <mm-grid columns="4" style="margin-top: var(--space-3)">
          <mm-color-token
            color="var(--gray0)"
            on-color="var(--foreground-color)"
            label="on background"
            token="background: #fff"
          ></mm-color-token>

          <mm-color-token
            color="var(--gray100)"
            on-color="var(--foreground-color)"
            label="on background-subtle"
            token="background-subtle: #f5f6f5"
          ></mm-color-token>
          <mm-color-token
            color="var(--gray800)"
            on-color="var(--foreground-color-on-solid)"
            label="on background-strong"
            token="background-strong: #303b35"
          ></mm-color-token>
        </mm-grid>

        <!-- <mm-token-group>
        <mm-token-item key="selection-indicator-color" value="var(--color-primary)"></mm-token-item>
        <mm-token-item
          key="selection-background"
          value="var(--color-primary-subtle)"
        ></mm-token-item>
        <mm-token-item key="selection-foreground" value="var(--color-primary)"></mm-token-item>
      </mm-token-group> -->
      </mm-flex>

      <mm-flex direction="column" gap="3">
        <mm-text-block
          level="2"
          heading="Typography"
          description="타이포그래피 토큰은 크기와 고정 행간을 함께 사용합니다. 행간은 컴포넌트의 역할에 맞춰 조합합니다."
        ></mm-text-block>
        <mm-flex direction="column" gap="4">
          <mm-surface variant="outlined" radius="large">
            <mm-marquee gap="4" speed="80" pause-on-hover>
              <mm-text size="32" weight="bold">
                font-family: Alan Sans, Gothic A1, system-ui, sans-serif
              </mm-text>
              <mm-text size="32" weight="bold">font-size: 32px</mm-text>
              <mm-text size="32" weight="bold">line-height: 40px</mm-text>
            </mm-marquee>
          </mm-surface>
          <mm-surface variant="outlined" radius="large">
            <mm-marquee gap="4" speed="64" pause-on-hover>
              <mm-text size="24" weight="bold">
                font-family: Alan Sans, Gothic A1, system-ui, sans-serif
              </mm-text>
              <mm-text size="24" weight="bold">font-size: 24px</mm-text>
              <mm-text size="24" weight="bold">line-height: 32px</mm-text>
            </mm-marquee>
          </mm-surface>
          <mm-surface variant="outlined" radius="large">
            <mm-marquee gap="4" speed="64" pause-on-hover>
              <mm-text size="18" weight="bold">
                font-family: Alan Sans, Gothic A1, system-ui, sans-serif
              </mm-text>
              <mm-text size="18" weight="bold">font-size: 18px</mm-text>
              <mm-text size="18" weight="bold">line-height: 28px</mm-text>
            </mm-marquee>
          </mm-surface>
          <mm-surface variant="outlined" radius="large">
            <mm-marquee gap="4" speed="64" pause-on-hover>
              <mm-text size="14" weight="bold">
                font-family: Alan Sans, Gothic A1, system-ui, sans-serif
              </mm-text>
              <mm-text size="14" weight="bold">font-size: 14px</mm-text>
              <mm-text size="14" weight="bold">line-height: 24px</mm-text>
            </mm-marquee>
          </mm-surface>
          <mm-surface variant="outlined" radius="large">
            <mm-marquee gap="4" speed="64" pause-on-hover>
              <mm-text size="12" weight="bold">
                font-family: Alan Sans, Gothic A1, system-ui, sans-serif
              </mm-text>
              <mm-text size="12" weight="bold">font-size: 12px</mm-text>
              <mm-text size="12" weight="bold">line-height: 16px</mm-text>
            </mm-marquee>
          </mm-surface>
        </mm-flex>

        <!-- <mm-flex align-items="end" gap="4">
        <mm-flex direction="column" align-items="center" gap="2">
          <mm-text size="32" weight="bold">Ag</mm-text>
          <mm-list-marker variant="number" value="1"></mm-list-marker>
        </mm-flex>
        <mm-flex direction="column" align-items="center" gap="2">
          <mm-text size="24" weight="bold">Ag</mm-text>
          <mm-list-marker variant="number" value="2"></mm-list-marker>
        </mm-flex>
        <mm-flex direction="column" align-items="center" gap="2">
          <mm-text size="18">Ag</mm-text>
          <mm-list-marker variant="number" value="3"></mm-list-marker>
        </mm-flex>
        <mm-flex direction="column" align-items="center" gap="2">
          <mm-text size="14">Ag</mm-text>
          <mm-list-marker variant="number" value="4"></mm-list-marker>
        </mm-flex>
        <mm-flex direction="column" align-items="center" gap="2">
          <mm-text size="12">Ag</mm-text>
          <mm-list-marker variant="number" value="5"></mm-list-marker>
        </mm-flex>
      </mm-flex> -->

        <mm-token-group>
          <!-- <mm-token-item
          key="font family"
          value=""
          style="border-color: #000; font-weight: var(--font-weight-bold)"
        ></mm-token-item> -->
          <mm-token-item
            key="font-family"
            value="Alan Sans, Gothic A1, system-ui, sans-serif"
          ></mm-token-item>
          <!-- <mm-token-item
          key="font weight"
          value=""
          style="border-color: #000; font-weight: var(--font-weight-bold)"
        ></mm-token-item> -->
          <mm-token-item key="font-weight-normal" value="500"></mm-token-item>
          <mm-token-item key="font-weight-bold" value="700"></mm-token-item>
          <!-- <mm-token-item
          key="font size"
          value=""
          style="
            border-color: #000;
            font-weight: var(--font-weight-bold);
            font-size: var(--font-size-18);
          "
        ></mm-token-item> -->
          <mm-token-item key="font-size-32" value="32px"></mm-token-item>
          <mm-token-item key="font-size-24" value="24px"></mm-token-item>
          <mm-token-item key="font-size-18" value="18px"></mm-token-item>
          <mm-token-item key="font-size-14" value="14px"></mm-token-item>
          <mm-token-item key="font-size-12" value="12px"></mm-token-item>
          <!-- <mm-token-item
          key="font line height"
          value=""
          style="border-color: #000; font-weight: var(--font-weight-bold)"
        ></mm-token-item> -->
          <mm-token-item key="font-line-height-40" value="40px"></mm-token-item>
          <mm-token-item key="font-line-height-32" value="32px"></mm-token-item>
          <mm-token-item key="font-line-height-28" value="28px"></mm-token-item>
          <mm-token-item key="font-line-height-24" value="24px"></mm-token-item>
          <mm-token-item key="font-line-height-16" value="16px"></mm-token-item>
        </mm-token-group>
      </mm-flex>

      <mm-flex direction="column" gap="3">
        <mm-text-block
          level="2"
          heading="Size"
          description="요소의 크기를 결정합니다. 주로 height에 사용하고 정사각형 요소에 한정하여 width에 사용합니다."
        ></mm-text-block>
        <mm-token-stage>
          <mm-flex align-items="flex-end" gap="8">
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-16);
                height: var(--size-16);
                background: var(--background-strong-color);
                border-radius: var(--radius);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="1"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-24);
                height: var(--size-24);
                background: var(--background-strong-color);
                border-radius: var(--radius);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="2"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-32);
                height: var(--size-32);
                background: var(--background-strong-color);
                border-radius: var(--radius);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="3"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-40);
                height: var(--size-40);
                background: var(--background-strong-color);
                border-radius: var(--radius);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="4"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-48);
                height: var(--size-48);
                background: var(--background-strong-color);
                border-radius: var(--radius);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="5"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-80);
                height: var(--size-80);
                background: var(--background-strong-color);
                border-radius: var(--radius);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="6"></mm-list-marker>
            </mm-flex>
          </mm-flex>
        </mm-token-stage>
        <mm-token-group>
          <mm-token-item key="size-16" value="16px"></mm-token-item>
          <mm-token-item key="size-24" value="24px"></mm-token-item>
          <mm-token-item key="size-32" value="32px"></mm-token-item>
          <mm-token-item key="size-40" value="40px"></mm-token-item>
          <mm-token-item key="size-48" value="48px"></mm-token-item>
          <mm-token-item key="size-80" value="80px"></mm-token-item>
        </mm-token-group>
      </mm-flex>

      <mm-flex direction="column" gap="3">
        <mm-text-block
          level="2"
          heading="Space"
          description="space는 요소 사이의 거리입니다."
        ></mm-text-block>
        <mm-token-stage>
          <mm-flex align-items="center" gap="8">
            <mm-flex direction="column" align-items="center" gap="2">
              <mm-flex align-items="center" gap="0">
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
                <div style="width: 2px; height: 4px; background: var(--color-primary)"></div>
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
              </mm-flex>
              <mm-list-marker variant="number" value="1"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <mm-flex align-items="center" gap="0">
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
                <div
                  style="width: var(--space-1); height: 4px; background: var(--color-primary)"
                ></div>
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
              </mm-flex>
              <mm-list-marker variant="number" value="2"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <mm-flex align-items="center" gap="0">
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
                <div
                  style="width: var(--space-2); height: 4px; background: var(--color-primary)"
                ></div>
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
              </mm-flex>
              <mm-list-marker variant="number" value="3"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <mm-flex align-items="center" gap="0">
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
                <div
                  style="width: var(--space-3); height: 4px; background: var(--color-primary)"
                ></div>
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
              </mm-flex>
              <mm-list-marker variant="number" value="4"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <mm-flex align-items="center" gap="0">
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
                <div
                  style="width: var(--space-4); height: 4px; background: var(--color-primary)"
                ></div>
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
              </mm-flex>
              <mm-list-marker variant="number" value="5"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <mm-flex align-items="center" gap="0">
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
                <div
                  style="width: var(--space-8); height: 4px; background: var(--color-primary)"
                ></div>
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
              </mm-flex>
              <mm-list-marker variant="number" value="6"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <mm-flex align-items="center" gap="0">
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
                <div
                  style="width: var(--space-12); height: 4px; background: var(--color-primary)"
                ></div>
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
              </mm-flex>
              <mm-list-marker variant="number" value="7"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <mm-flex align-items="center" gap="0">
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
                <div
                  style="width: var(--space-16); height: 4px; background: var(--color-primary)"
                ></div>
                <div
                  style="
                  width: 2px;
                  height: var(--size-32);
                  background: var(--background-strong-color);
                  border-radius: var(--radius);
                "
                ></div>
              </mm-flex>
              <mm-list-marker variant="number" value="8"></mm-list-marker>
            </mm-flex>
          </mm-flex>
        </mm-token-stage>
        <mm-token-group>
          <mm-token-item key="space-1" value="4px"></mm-token-item>
          <mm-token-item key="space-2" value="8px"></mm-token-item>
          <mm-token-item key="space-3" value="12px"></mm-token-item>
          <mm-token-item key="space-4" value="16px"></mm-token-item>
          <mm-token-item key="space-8" value="32px"></mm-token-item>
          <mm-token-item key="space-12" value="48px"></mm-token-item>
          <mm-token-item key="space-16" value="64px"></mm-token-item>
        </mm-token-group>
      </mm-flex>

      <mm-flex direction="column" gap="3">
        <mm-text-block
          level="2"
          heading="Layout"
          description="레이아웃 토큰은 페이지, 팝오버, 폼 컨테이너처럼 반복되는 구조의 최대 너비와 여백을 정의합니다."
        ></mm-text-block>
        <mm-token-group>
          <mm-token-item key="layout-width-wide" value="1280px"></mm-token-item>
          <mm-token-item key="layout-width-small" value="640px"></mm-token-item>
          <mm-token-item key="layout-width-narrow" value="400px"></mm-token-item>
          <mm-token-item key="layout-width-sidebar" value="16rem"></mm-token-item>
          <mm-token-item key="layout-padding-inline" value="5vw"></mm-token-item>
        </mm-token-group>
      </mm-flex>

      <mm-flex direction="column" gap="3">
        <mm-text-block
          level="2"
          heading="Border"
          description="테두리는 표면의 경계와 클릭 가능성을 표현합니다. 모서리 곡률은 요소의 성격과 위계를 시각적으로 구분합니다."
        ></mm-text-block>
        <mm-token-stage>
          <mm-flex align-items="flex-end" gap="4">
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-48);
                height: var(--size-48);
                border: var(--border);
                border-radius: var(--radius);
                background: var(--background-color);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="1"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-48);
                height: var(--size-48);
                border: var(--border);
                border-radius: var(--radius);
                background: var(--background-color);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="2"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-48);
                height: var(--size-48);
                border: var(--interaction-selected-border-color);
                border-radius: var(--radius);
                background: var(--background-color);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="3"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-48);
                height: var(--size-48);
                border: var(--border-transparent);
                border-radius: var(--radius);
                background: var(--background-subtle-color);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="4"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-48);
                height: var(--size-48);
                border: var(--border);
                border-radius: var(--radius);
                background: var(--background-color);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="1"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-48);
                height: var(--size-48);
                border: var(--border);
                border-radius: var(--radius-large);
                background: var(--background-color);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="2"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-48);
                height: var(--size-48);
                border: var(--border);
                border-radius: var(--radius-full);
                background: var(--background-color);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="3"></mm-list-marker>
            </mm-flex>
          </mm-flex>
        </mm-token-stage>
        <mm-token-group>
          <mm-token-item key="border-width" value="1px"></mm-token-item>

          <mm-token-item key="border" value="1px solid var(--border-color)"></mm-token-item>
          <mm-token-item
            key="border-transparent"
            value="var(--border-width) solid transparent"
          ></mm-token-item>
          <mm-token-item key="border-radius" value="6px"></mm-token-item>
          <mm-token-item key="border-radius-large" value="1rem"></mm-token-item>
          <mm-token-item key="border-radius-full" value="50%"></mm-token-item>
        </mm-token-group>
      </mm-flex>

      <mm-flex direction="column" gap="3">
        <mm-text-block
          level="2"
          heading="Shadow"
          description="그림자는 레이어의 고도와 부유감을 표현합니다."
        ></mm-text-block>
        <mm-token-stage>
          <mm-flex align-items="flex-end" gap="4">
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-48);
                height: var(--size-48);
                border-radius: var(--radius);
                background: var(--background-color);
                box-shadow: var(--surface-base-shadow);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="1"></mm-list-marker>
            </mm-flex>
            <mm-flex direction="column" align-items="center" gap="2">
              <div
                style="
                width: var(--size-48);
                height: var(--size-48);
                border-radius: var(--radius);
                background: var(--background-color);
                box-shadow: var(--surface-high-shadow);
                flex-shrink: 0;
              "
              ></div>
              <mm-list-marker variant="number" value="2"></mm-list-marker>
            </mm-flex>
          </mm-flex>
        </mm-token-stage>
        <mm-token-group aria-label="shadow primitive tokens">
          <mm-token-item
            key="surface-base-shadow"
            value="0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.08)"
          ></mm-token-item>
          <mm-token-item
            key="surface-high-shadow"
            value="0 16px 32px rgba(0,0,0,.2)"
          ></mm-token-item>
        </mm-token-group>

        <mm-separator></mm-separator>
      </mm-flex>

      <mm-flex direction="column" gap="3">
        <mm-text-block
          level="2"
          heading="Blur & Opacity"
          description="material은 뒤 배경을 얼마나 흐리고 덮을지 정하는 blur·opacity 쌍입니다. 단계가 오를수록 더 흐리고 더 불투명해집니다."
        ></mm-text-block>
        <mm-token-stage>
          <div
            style="
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 100%;
            height: 100px;
            border-radius: var(--radius-large);
            overflow: hidden;
            background: linear-gradient(
              135deg,
              var(--color-primary) 0%,
              var(--color-accent) 50%,
              var(--color-danger) 100%
            );
          "
          >
            <mm-flex gap="4">
              <mm-flex direction="column" align-items="center" gap="2">
                <div
                  style="
                  width: var(--size-48);
                  height: var(--size-48);
                  border-radius: var(--radius);
                  background: rgb(255 255 255 / var(--surface-base-opacity));
                  backdrop-filter: blur(var(--surface-base-blur));
                  -webkit-backdrop-filter: blur(var(--surface-base-blur));
                  flex-shrink: 0;
                "
                ></div>
                <mm-list-marker variant="number" value="1"></mm-list-marker>
              </mm-flex>
              <mm-flex direction="column" align-items="center" gap="2">
                <div
                  style="
                  width: var(--size-48);
                  height: var(--size-48);
                  border-radius: var(--radius);
                  background: rgb(255 255 255 / var(--surface-high-opacity));
                  backdrop-filter: blur(var(--surface-high-blur));
                  -webkit-backdrop-filter: blur(var(--surface-high-blur));
                  flex-shrink: 0;
                "
                ></div>
                <mm-list-marker variant="number" value="2"></mm-list-marker>
              </mm-flex>
            </mm-flex>
          </div>
        </mm-token-stage>
        <mm-token-group aria-label="material primitive tokens">
          <mm-token-item key="surface-base-blur" value="10px"></mm-token-item>
          <mm-token-item key="surface-base-opacity" value="0.35"></mm-token-item>
          <mm-token-item key="surface-high-blur" value="20px"></mm-token-item>
          <mm-token-item key="surface-high-opacity" value="0.55"></mm-token-item>
        </mm-token-group>
      </mm-flex>

      <mm-flex direction="column" gap="3">
        <mm-text-block
          level="2"
          heading="Z-index"
          description="z-index는 레이어의 우선순위를 정의합니다. 같은 레이어군 안에서만 비교되도록 의미 이름을 사용합니다."
        ></mm-text-block>

        <mm-token-group>
          <mm-token-item key="material-zindex-base" value="0"></mm-token-item>
          <mm-token-item key="material-zindex-raised" value="10"></mm-token-item>
          <mm-token-item key="material-zindex-overlay" value="100"></mm-token-item>
          <mm-token-item key="material-zindex-modal" value="1000"></mm-token-item>
          <mm-token-item key="material-zindex-chrome" value="1100"></mm-token-item>
          <mm-token-item key="material-zindex-toast" value="9000"></mm-token-item>
        </mm-token-group>

        <mm-text-list
          texts='[
          "base — mm-separator의 구분선, 배경 위에 놓는 텍스트처럼 형제 요소 위에 그리기 위한 로컬 컨텍스트",
          "raised — 목록·그룹 안에서 형제보다 살짝 뜨는 요소. 예: mm-hamburger-button",
          "overlay — 드롭다운·팝오버·툴팁류. 예: mm-tooltip, mm-popover(mm-select 등 드롭다운의 기반)",
          "modal — 화면을 덮는 대화형 표면. 예: mm-backdrop, mm-sheet, 긴급 배너",
          "chrome — 화면에 고정된 내비게이션·툴바. 예: mm-navbar(및 사이드 메뉴), mm-top-bar(sticky 상태), mm-fixed-bottom(mm-bottom-bar가 이 안에 놓여 함께 뜬다)",
          "toast — 알림, 스낵바처럼 항상 다른 모든 레이어 위에 있어야 하는 요소. 예: mm-toast, 건너뛰기(skip) 링크"
        ]'
        ></mm-text-list>
      </mm-flex>

      <mm-component-references>
        <mm-link external href="https://design-tokens.github.io/community-group/format">
          Design Tokens Format Module, W3C
        </mm-link>
        <mm-link external href="https://docs.specifyapp.com/concepts/token-types">
          Specify Token Types
        </mm-link>
        <mm-link external href="https://www.delldesignsystem.com/foundations/elevation/">
          Dell Elevation
        </mm-link>
        <mm-link external href="https://www.delldesignsystem.com/foundations/typography/">
          Dell Typography
        </mm-link>
        <mm-link external href="https://atlassian.design/components/tokens/all-tokens">
          Atlassian Tokens
        </mm-link>
        <mm-link
          external
          href="https://medium.com/eightshapes-llc/size-in-design-systems-64f234aec519"
        >
          Size in Design Systems
        </mm-link>
      </mm-component-references>
    </mm-flex>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})

document.addEventListener('DOMContentLoaded', () => {
  // document.querySelector('body')!.insertBefore(navbar, );
  // renderSidemenu
  // document.querySelector('.page')!.insertAdjacentHTML('afterbegin', sidemenu)
})

const colorTokens = [
  { name: '--gray0', value: '', cases: ['--background-color'] },
  { name: '--gray100', value: '', cases: ['--background-subtle-color'] },
  { name: '--gray200', value: '', cases: ['--border-color'] },
  { name: '--gray400', value: '', cases: ['--foreground-subtle-color'] },
  // { name: '--gray600', value: '' },
  { name: '--gray800', value: '', cases: ['--foreground-color', '--background-strong-color'] },
  { name: '--green100', value: '', cases: ['--color-primary-subtle'] },
  { name: '--green800', value: '', cases: ['--color-primary'] },
  { name: '--red100', value: '', cases: ['--color-danger-light'] },
  { name: '--red800', value: '', cases: ['--color-danger'] },
  { name: '--yellow800', value: '', cases: ['--color-accent'] },
  {
    name: '--interaction-selected-background-color',
    value: 'var(--color-primary-subtle)',
    cases: [],
  },
  { name: '--interaction-selected-foreground-color', value: 'var(--color-primary)', cases: [] },
  { name: '--interaction-selected-border-color', value: 'var(--color-primary)', cases: [] },
  { name: '--color-primary', value: 'var(--green800)', cases: [] },
  { name: '--color-primary-subtle', value: 'var(--green100)', cases: [] },
  { name: '--color-accent', value: 'var(--yellow800)', cases: [] },

  { name: '--color-success', value: 'var(--green800)', cases: [] },
  { name: '--color-success-foreground', value: '#117a45', cases: [] },

  {
    name: '--color-success-border',
    value: 'color-mix(in srgb, var(--color-success) 30%, transparent)',
    cases: [],
  },
  { name: '--color-warning', value: 'var(--orange800)', cases: [] },
  { name: '--color-warning-foreground', value: '#9a4600', cases: [] },
  { name: '--color-danger', value: 'var(--red800)', cases: [] },
  { name: '--color-danger-foreground', value: '#c51635', cases: [] },

  { name: '--background-color', value: 'var(--gray0)', cases: [] },
  { name: '--background-subtle-color', value: 'var(--gray100)', cases: [] },
  { name: '--background-strong-color', value: 'var(--gray800)', cases: [] },
  { name: '--border-color', value: 'var(--gray200)', cases: [] },
  { name: '--foreground-color', value: 'var(--gray800)', cases: [] },
  { name: '--foreground-subtle-color', value: 'var(--gray400)', cases: [] },
  { name: '--foreground-color-on-solid', value: 'var(--gray0)', cases: [] },
  { name: '--foreground-color-on-warning', value: 'var(--red800)', cases: [] },
  { name: '--foreground-color-on-primary', value: 'var(--gray0)', cases: [] },
  { name: '--interaction-focus-outline', value: '2px solid var(--gray800)', cases: [] },
  { name: '--interaction-active-background-color', value: 'var(--color-accent)', cases: [] },
  { name: '--color-interaction-active-border', value: '#008296', cases: [] },
  {
    name: '--interaction-active-shadow',
    value: '0 0 0 2px #c8f3fa, inset 0 0 0 2px var(--foreground-color-on-solid)',
    cases: [],
  },
  { name: '--skeleton-sample', value: '', cases: [''] },
  { name: '--gradient-transparnet', value: '', cases: [''] },
  { name: '--radius', value: '6px', cases: [''] },
  { name: '--radius-large', value: '1rem', cases: [''] },
  { name: '--radius-full', value: '50%', cases: [''] },
  {
    name: '--surface-base-shadow',
    value: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
    cases: [''],
  },
]

const typographyTokens = [
  { name: '--font-family', value: "'Alan Sans', 'Gothic A1', system-ui, sans-serif" },
  { name: '--font-size-32', value: '32px' },
  { name: '--font-size-24', value: '24px' },
  { name: '--font-size-18', value: '18px' },
  { name: '--font-size-14', value: '14px' },
  { name: '--font-size-12', value: '12px' },
  { name: '--font-line-height-40', value: '40px' },
  { name: '--font-line-height-32', value: '32px' },
  { name: '--font-line-height-28', value: '28px' },
  { name: '--font-line-height-24', value: '24px' },
  { name: '--font-line-height-16', value: '16px' },
  { name: '--font-weight-normal', value: '500' },
  { name: '--font-weight-bold', value: '700' },
]

const sizeTokens = [
  { name: '--size-80', value: '80px', cases: ['--avatar-size', '--list-item-size'] },
  {
    name: '--size-48',
    value: '48px',
    cases: ['--avatar-size', '--button-height', '--input-height'],
  },
  { name: '--size-40', value: '40px', cases: ['--avatar-size'] },
  { name: '--size-32', value: '32px', cases: ['--avatar-size', '--button-height'] },
  {
    name: '--size-24',
    value: '24px',
    cases: ['--tag-height', '--checkbox-size'],
  },
  {
    name: '--size-16',
    value: '16px',
    cases: ['--checkbox-size', '--radio-size', '--icon-button-size'],
  },
]

const spacingTokens = [
  { name: '--grid-gutter', value: '' },
  { name: '--grid-column', value: '' },
  { name: '--layout-padding-inline', value: '5vw' },
  { name: '--space-1', value: '4px' },
  { name: '--space-2', value: '8px' },
  { name: '--space-3', value: '12px' },
  { name: '--space-4', value: '16px' },
  { name: '--space-8', value: '32px' },
  { name: '--space-12', value: '48px' },
  { name: '--space-16', value: '64px' },
  { name: '--space-section', value: 'var(--space-16)' },
]

const layerTokens = [
  { name: '--material-zindex-base', value: '0' },
  { name: '--material-zindex-raised', value: '10' },
  { name: '--material-zindex-overlay', value: '100' },
  { name: '--material-zindex-modal', value: '1000' },
  { name: '--material-zindex-chrome', value: '1100' },
  { name: '--material-zindex-toast', value: '9000' },
]

const positioningTokens = []

const animationTokens = [
  { name: '--bazier', value: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)' },
  { name: '--animation-delay-first', value: '0.2s' },
  { name: '--animation-delay-second', value: '0.4s' },
  { name: '--animation-delay-third', value: '0.6s' },
  { name: '--animation-duration', value: '0.4s' },
  { name: '--animation-duration-instant', value: '0s' },
  { name: '--duration-quickly', value: '0.2s' },
  { name: '--duration-slowly', value: '0.6s' },
]

const article = [
  {
    title: 'Palette',
    kicker: 'color and surface',
    description: [
      'hierarchy. 크기와 비례해서 radius와 shadow 조정이 필요하지만 규칙을 최소화.',
      'theme. 인버트 컬러셋을 추가로 정의하지 않습니다. 하나의 컬러셋으로 다크 테마에 대응합니다. (쉽지 않음... )',
      'colour. background/border/text/status',
    ],
    tokens: [...colorTokens],
  },
  {
    title: 'Typography',
    kicker: '활자의 위계와 배치.',
    description:
      '폰트마다 baseline이 다르기 때문에 폰트 변경 시 내부 텍스트의 상하 간격이 안 맞을 수 있다. 폰트를 변경하지 않고 대응하려면? 텍스트노드(레이블 역할)의 상단 패딩에 변수를 하나 추가해둔다.',
    tokens: [...typographyTokens],
  },
  {
    title: 'Sizing',
    kicker: '요소의 너비와 길이',
    description: [
      '사이즈 토큰으로 추상화하지 않는 케이스 --navbar-height: var(--size-80)5rem, --sidenav-width: null',
      '예외 케이스 switch height: 20px',
    ],
    tokens: [...sizeTokens],
  },
  {
    title: 'Spacing',
    kicker: '요소 사이의 간격. outset과 inset.',
    description:
      '폰트마다 baseline이 다르기 때문에 폰트 변경 시 내부 텍스트의 상하 간격이 안 맞을 수 있다. 폰트를 변경하지 않고 대응하려면? 텍스트노드(레이블 역할)의 상단 패딩에 변수를 하나 추가해둔다.',
    tokens: [...spacingTokens],
  },
  {
    title: 'Layout',
    kicker: '활자의 위계와 배치.',
    description:
      '폰트마다 baseline이 다르기 때문에 폰트 변경 시 내부 텍스트의 상하 간격이 안 맞을 수 있다. 폰트를 변경하지 않고 대응하려면? 텍스트노드(레이블 역할)의 상단 패딩에 변수를 하나 추가해둔다.',
    tokens: [...colorTokens],
  },
  {
    title: 'Positioning',
    kicker: '활자의 위계와 배치.',
    description:
      '폰트마다 baseline이 다르기 때문에 폰트 변경 시 내부 텍스트의 상하 간격이 안 맞을 수 있다. 폰트를 변경하지 않고 대응하려면? 텍스트노드(레이블 역할)의 상단 패딩에 변수를 하나 추가해둔다.',
    tokens: [...positioningTokens],
  },
  {
    title: 'Z-index',
    kicker: '활자의 위계와 배치.',
    description:
      '폰트마다 baseline이 다르기 때문에 폰트 변경 시 내부 텍스트의 상하 간격이 안 맞을 수 있다. 폰트를 변경하지 않고 대응하려면? 텍스트노드(레이블 역할)의 상단 패딩에 변수를 하나 추가해둔다.',
    tokens: [...layerTokens],
  },
  {
    title: 'Opacity 🚧',
    kicker: '투명도',
    description: 'disabled state',
    tokens: [...colorTokens],
  },
  {
    title: 'Animation',
    kicker: '작성 중. 애니메이션을 위한 유틸리티 클래스?',
    description:
      '콘텐츠보다 액션이 강조되지 않도록 뷰포트 내에서 delay를 최대 3개로 제한합니다. inactive로 변경될 때(닫기 등) 즉시(instantly) 실행 합니다.',
    tokens: [...animationTokens],
  },
  { title: 'test', description: 'test test', tokens: [...colorTokens] },
]

// document.addEventListener('DOMContentLoaded', () => {
//   article.forEach(item => {
//     const articleSample = `
//       <article class="article js-scrollspy-section">
//         <mm-text size="32">${item.title}</mm-text>
//         <mm-paragraph size="large">
//         ${item.kicker}
//         </mm-paragraph>
//         <mm-paragraph style="margin:2rem 0">${item.description}</mm-paragraph>
//         <div class="token-group">
//           ${item.tokens.map(item => {
//             return `<article class="token-item tile-flat ${item.name}">
//               <figure class="token-item-avatar"></figure>
//               <b>${item.name}</b>
//               <div>
//                 <mm-paragraph>--color-background</mm-paragraph>
//               </div>
//               <button class="icon-indicator" style="position: absolute; right: 0.5rem; top: 0.5rem">
//                 <span class="material-symbols-outlined">content_copy</span>
//               </button>
//             </article>`
//           })}
//         </div>
//       </article>
//     `

//     document.querySelector('.tokens-body')!.innerHTML += articleSample
//   })

// })

// const temp = colorTokens.forEach(token => {
//   const tokenItem = `
//   <article class="token-item tile-flat is-gray000">
//     <figure class="token-item-avatar"></figure>
//     <b>${token.name}</b>
//     <div>
//       <mm-paragraph>--color-background</mm-paragraph>
//     </div>
//     <button class="icon-indicator" style="position: absolute; right: 0.5rem; top: 0.5rem">
//       <span class="material-symbols-outlined">content_copy</span>
//     </button>
//   </article>
//   `
//   document.querySelector('.tokens-body')!.innerHTML += tokenItem
// })

function renderComponent() {}
