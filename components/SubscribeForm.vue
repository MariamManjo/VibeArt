<script setup lang="ts">
import { ref } from 'vue'
import { useNav } from '@slidev/client'
import type { Category } from '../composables/useLocale'
import { useLocale } from '../composables/useLocale'
import RolePicker from './RolePicker.vue'

const { go } = useNav()
const { locale, t } = useLocale()
const email = ref('')
const category = ref<Category | null>(null)
const terms = ref(false)
const pending = ref(false)
const done = ref(false)
const error = ref<string | null>(null)

function mapError(code?: string) {
  switch (code) {
    case 'invalid_email':
      return t.value.errEmail
    case 'invalid_category':
      return t.value.errRole
    case 'terms_required':
      return t.value.errTerms
    case 'duplicate':
      return t.value.errDup
    default:
      return t.value.errGeneric
  }
}

async function submit() {
  error.value = null
  const value = email.value.trim()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error.value = t.value.errEmail
    return
  }
  if (!category.value) {
    error.value = t.value.errRole
    return
  }
  if (!terms.value) {
    error.value = t.value.errTerms
    return
  }

  pending.value = true
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: value,
        category: category.value,
        locale: locale.value,
        termsAccepted: terms.value,
      }),
    })
    const data = (await res.json()) as { error?: string }
    if (!res.ok) {
      error.value = mapError(data.error)
      return
    }
    done.value = true
  }
  catch {
    error.value = t.value.errGeneric
  }
  finally {
    pending.value = false
  }
}
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 650, delay: 80 } }"
    class="panel"
  >
    <Transition name="fade" mode="out-in">
      <div v-if="done" key="ok" class="success">
        <div class="check">✓</div>
        <div class="ok-title">{{ t.success }}</div>
      </div>

      <form v-else key="form" class="form" @submit.prevent="submit">
        <RolePicker v-model="category" />

        <label class="field">
          <span>{{ t.email }}</span>
          <input
            v-model="email"
            type="email"
            autocomplete="email"
            :placeholder="t.emailPh"
          >
        </label>

        <label class="terms">
          <input v-model="terms" type="checkbox">
          <span>
            {{ t.agree }}
            <button type="button" class="link" @click="go(4)">{{ t.terms }}</button>
          </span>
        </label>

        <p v-if="error" class="error" role="alert">{{ error }}</p>

        <button class="cta" type="submit" :disabled="pending">
          {{ pending ? t.sending : t.subscribe }}
        </button>
      </form>
    </Transition>
  </div>
</template>

<style scoped>
.panel {
  width: min(100%, 28rem);
  margin: 0 auto;
}

.form {
  display: grid;
  gap: 0.7rem;
  text-align: left;
}

.field {
  display: grid;
  gap: 0.35rem;
}

.field span {
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9aa8a1;
}

.field input {
  height: 2.55rem;
  border-radius: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: #f2f5f2;
  padding: 0 0.95rem;
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.field input::placeholder {
  color: rgba(255, 255, 255, 0.28);
}

.field input:focus {
  border-color: rgba(168, 197, 181, 0.55);
  box-shadow: 0 0 0 3px rgba(168, 197, 181, 0.18);
}

.terms {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  color: #a0ada7;
  font-size: 0.85rem;
}

.terms .link {
  border: 0;
  background: transparent;
  padding: 0;
  color: #d7e4dc;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  font: inherit;
}

.cta {
  height: 2.55rem;
  border: 0;
  border-radius: 0.85rem;
  background: #e8eee9;
  color: #121614;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 10px 40px rgba(168, 197, 181, 0.18);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.cta:hover:not(:disabled) {
  background: #fff;
  transform: translateY(-1px);
  box-shadow: 0 14px 48px rgba(168, 197, 181, 0.28);
}

.cta:disabled {
  opacity: 0.7;
  cursor: wait;
}

.error {
  margin: 0;
  color: #e8a090;
  font-size: 0.85rem;
}

.success {
  min-height: 10rem;
  display: grid;
  place-content: center;
  gap: 0.7rem;
  text-align: center;
}

.check {
  width: 3rem;
  height: 3rem;
  margin: 0 auto;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(168, 197, 181, 0.18);
  color: #e8eee9;
  font-size: 1.2rem;
  border: 1px solid rgba(168, 197, 181, 0.45);
}

.ok-title {
  font-family: var(--slidev-font-serif), 'Noto Serif Georgian', serif;
  font-size: 1.6rem;
  color: #f4f7f4;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 900px) {
  .panel {
    width: 100%;
  }

  .field input,
  .cta {
    height: 3rem;
    font-size: 1rem;
  }

  .cta {
    letter-spacing: 0.1em;
  }

  .terms {
    font-size: 0.92rem;
  }
}
</style>
