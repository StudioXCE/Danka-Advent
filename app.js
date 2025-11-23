const AUTH_KEY = 'advent-video-calendar:authorized';
const WATCHED_KEY = 'advent-video-calendar:watched';
const PASSPHRASE = 'Christmas_DK';

const params = new URLSearchParams(window.location.search);
const previewMode = params.get('preview') === 'true';
const selectedYear = Number(params.get('year'));
const eventYear = Number.isFinite(selectedYear) ? selectedYear : new Date().getFullYear();

const descriptions = [
  'Dori a Urbanovic děti',
  'Jan Heindel',
  'Radka a Míša',
  'Marie Eckhardtová',
  'Julča a Lukáš Pokorní',
  'Jovanka Chvojková',
  'Romča Pavlínová',
  'Elizabeth Polak',
  'Míša Vašina',
  'Lucka Hutrová',
  'David Novák',
  'Evča Ždímalová',
  'Lucka Štveráková',
  'Tomáš Urban',
  'Jana Erneyiová',
  'Škrobáci',
  'Eva Urbanová',
  'Martin a Ellen Bělovi',
  'Tom a Natka Koutečtí',
  'Kája Tulachová',
  'Štěpánka Urbanová',
  'Megan Melicharová',
  'Kačka Sára Lembke',
  'Martin a Timík'
];

const fallbackVideo = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

// Update each entry below with the actual file/location for that day's video.
const videoSources = [
  { url: 'https://dl.dropboxusercontent.com/scl/fi/at3aw7c8c5sun88ursjjb/01_Dori.01.mp4?rlkey=a0ra4bi17pmtqbmlkn1m3jic6&st=8q8d62ls&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/6mdj0iogbvsc4gtkosdvp/02_Jan-Heindel.01.mp4?rlkey=hdseayjfvxjxnixmog2mfsdbj&st=gife4yp8&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/okqtcgbej9z6bn6zjaafa/03_Radka-a-Misa.mp4?rlkey=fmymyrgz0aozywqaxqx1opm17&st=l5c1xyn0&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/o7pyc8jfl5duqk8hxyg5l/04_Marie-Eckhardtova.01.mp4?rlkey=xzd8z83bp2fkorr8jzjkuo8em&st=daw9lxx4&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/albbiovengg9w2kyabuac/05_Pokorni.01.mp4?rlkey=nrtj76jlu1edh3poevjc1yr78&st=c7yntfaj&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/mq9e4np7wuxvbvsezwkkq/06_Jovanka.01.mp4?rlkey=2bq9cycqpom3i0ohietbg7q0l&st=mng7kkc3&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/w2ym44ffkgnxdmxdc5c31/07_Romca-Pavlinova.new.01.mp4?rlkey=otz92x0o0h1jnekvgg9x346a1&st=33qouu8k&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/8j95fyvn1u1ji44mtgk9r/08_Elizabeth-Polak.01.mp4?rlkey=5493vsdh0xi6e7mrl0cu0zhyr&st=28d74el7&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/nw5osy7ethv8ohfekmn5y/09_Misa_Trans.mxf.01.mp4?rlkey=udtkpn3q4v0q133eo2ssmyhhb&st=hjn3vjky&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/lc9pfo1mn03ejvkdoovkw/10_Lucka-Hutrova.01.mp4?rlkey=imfmdqdk4x9b2ap55ye4jsczl&st=ath1fj11&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/bjtv2914bgm68uksmb7m9/11_David-Novak.01.mp4?rlkey=4kte61pwuh7ux3ccdkjoc61yi&st=9g01yell&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/8anw4syr6wc880wlfwagp/12_Evca-Zdimalova.01.mp4?rlkey=n94cn9v0j0xi0thall93daqgy&st=nd0rzdmu&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/vhnyo46sndu9q6ppub1wj/13_Lucka-z-Modliteb.01.mp4?rlkey=6ymlzkq1wf9a2hlq4ubtcvgax&st=7ltrwc4f&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/v4ck8ub5uou0x19d288o9/14_Urbanovi-Tomas.01.mp4?rlkey=7sia9z8gf47vk0ieidhoiyzld&st=6a6mlqal&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/sz2tap71nej838ea9jfel/15_Jana-Erneyiova.01.mp4?rlkey=1fvlcgh2v581iggetnu2urfwk&st=8siev71s&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/kquz4fni5wt088m2y6wbi/16_Skrobakovi.01.mp4?rlkey=zj5hlf1bc18u7egp89fvwjegn&st=k3zjj0s5&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/qq1kovtzefik0tagk25te/17_Eva-Urbanova.01.mp4?rlkey=sbbdo11rto102vs0dypk53s62&st=1kyyvjef&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/n5yjd9f23bzgu7o631y8h/18_Martin-a-Ellen.01.mp4?rlkey=tco6sqffxk9trsa9hvy5sbsp6&st=flkk84c4&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/zawyy56d54mtxdeoekaw1/19_Tom-a-Natka-Koutecti.01.mp4?rlkey=5tkiyl8yecdw5wkd3lmsub58u&st=wm00v1ah&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/heu63ipfbnom0qs0cpnj4/20_Kaja-Tulachova.mp4?rlkey=qe0tc761webty4ncq0452xuj0&st=knb496n0&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/1w2tgh6u0k0j10r3wvi1p/21_Urban-Stepanka.01.mp4?rlkey=ilgh3xb7nee78bw46nvmavbqe&st=sslfhxje&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/t1tsb0cr9ydxyx2iqd45o/22_Megan-Melicharova.01.mp4?rlkey=h2cp9mad30t5ds31hti5qj6x5&st=zedeeni7&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/qvch2mzp5il9eladxmkhq/23_Kacka-Sara-Lembke.01.mp4?rlkey=0lhcxu6plp3a88s6fgtw18fji&st=ytg29ghm&dl=0' },
  { url: 'https://dl.dropboxusercontent.com/scl/fi/tydxn833oi2peiuqgzaq3/24_Martin.mp4?rlkey=qpiu4n9v2iw1j834ans5v0y7e&st=ry0v7thg&dl=0' }
];

const videoMessages = videoSources.map((source, index) => {
  const day = index + 1;
  const dayString = String(day).padStart(2, '0');
  const doorImage = source.doorImage || `images/day${dayString}.jpg`;
  const releaseDate = new Date(eventYear, 11, day, 0, 0, 0);
  return {
    day,
    id: `day-${dayString}`,
    title: `Den ${dayString}`,
    description: descriptions[index] || descriptions[descriptions.length - 1],
    videoUrl: source.url || fallbackVideo,
    poster: source.poster || '',
    doorImage,
    releaseDate
  };
});

const elements = {
  grid: document.querySelector('[data-calendar-grid]'),
  progress: document.querySelector('[data-progress-count]'),
  template: document.getElementById('calendar-door-template'),
  authForm: document.getElementById('auth-form'),
  passphraseField: document.getElementById('passphrase'),
  authError: document.getElementById('auth-error'),
  authGate: document.getElementById('auth-gate'),
  signOut: document.querySelector('[data-sign-out]'),
  modal: document.getElementById('video-modal'),
  modalTitle: document.querySelector('[data-video-title]'),
  modalDescription: document.querySelector('[data-video-description]'),
  modalVideo: document.querySelector('[data-video-player]'),
  modalClosers: document.querySelectorAll('[data-close-modal]')
};

const storedAuth = safeParse(safeStorageGet(AUTH_KEY));
const storedWatched = safeParse(safeStorageGet(WATCHED_KEY));

const state = {
  authorized: storedAuth === true,
  watched: new Set(Array.isArray(storedWatched) ? storedWatched : []),
  currentMessage: null
};

toggleAuthState(state.authorized);

setupAuthForm();
setupModal();
setupLiveRefresh();
updateProgress();

function setupAuthForm() {
  if (!elements.authForm) {
    return;
  }

  elements.authForm.addEventListener('submit', event => {
    event.preventDefault();
    const passphrase = elements.passphraseField ? elements.passphraseField.value : '';
    if (!passphrase) {
      return;
    }

    setAuthError('');

    if (comparePassphrase(passphrase, PASSPHRASE)) {
      safeStorageSet(AUTH_KEY, 'true');
      toggleAuthState(true);
      if (elements.passphraseField) {
        elements.passphraseField.value = '';
      }
    } else {
      setAuthError('That passphrase does not match. Please try again.');
    }
  });

  if (elements.signOut) {
    elements.signOut.addEventListener('click', () => {
      safeStorageRemove(AUTH_KEY);
      toggleAuthState(false);
    });
  }
}

function setupModal() {
  if (elements.modalClosers && typeof elements.modalClosers.length === 'number') {
    Array.prototype.forEach.call(elements.modalClosers, btn => {
      btn.addEventListener('click', closeModal);
    });
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

function openMessage(message) {
  if (!elements.modal || !elements.modalVideo) {
    return;
  }

  state.currentMessage = message;
  elements.modalTitle.textContent = message.title;
  elements.modalDescription.textContent = message.description;
  elements.modalVideo.src = message.videoUrl;
  elements.modalVideo.setAttribute('poster', message.poster || '');
  elements.modal.classList.remove('hidden');
  elements.modal.setAttribute('aria-hidden', 'false');

  requestAnimationFrame(() => {
    const playPromise = elements.modalVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Auto-play can be blocked; ignore silently.
      });
    }
  });

  markAsWatched(message.day);
}

function closeModal() {
  if (!elements.modal || !elements.modalVideo || elements.modal.classList.contains('hidden')) {
    return;
  }

  elements.modal.classList.add('hidden');
  elements.modal.setAttribute('aria-hidden', 'true');
  elements.modalVideo.pause();
  elements.modalVideo.removeAttribute('src');
  elements.modalVideo.load();
  state.currentMessage = null;
}

function renderCalendar() {
  if (!elements.grid || !elements.template) {
    return;
  }

  elements.grid.innerHTML = '';
  const now = new Date();
  let unlockedCount = 0;

  videoMessages.forEach(message => {
    const clone = elements.template.content.firstElementChild.cloneNode(true);
    const numberEl = clone.querySelector('.calendar__number');
    const statusEl = clone.querySelector('.calendar__status');
    const available = previewMode || now >= message.releaseDate;
    const watched = state.watched.has(message.day);
    const dayLabel = `Day ${String(message.day).padStart(2, '0')}`;
    let ariaLabel = dayLabel;

    numberEl.textContent = String(message.day);

    if (message.doorImage) {
      clone.style.setProperty('--door-image', `url("${message.doorImage}")`);
    } else {
      clone.style.removeProperty('--door-image');
    }

    if (!state.authorized) {
      clone.disabled = true;
      statusEl.textContent = 'Enter passphrase';
      ariaLabel = `${dayLabel}: locked, enter passphrase`;
    } else if (!available) {
      clone.disabled = true;
      clone.classList.add('upcoming');
      statusEl.textContent = `Opens ${formatDate(message.releaseDate)}`;
      ariaLabel = `${dayLabel}: opens ${formatDate(message.releaseDate)}`;
    } else {
      clone.disabled = false;
      clone.classList.add('available');
      statusEl.textContent = watched ? 'Rewatch' : 'Open';
      ariaLabel = `${dayLabel}: ${watched ? 'rewatch' : 'open'}`;
      unlockedCount += 1;
      if (watched) {
        clone.classList.add('played');
      }
      clone.addEventListener('click', () => openMessage(message));
    }

    clone.setAttribute('aria-label', ariaLabel);
    elements.grid.appendChild(clone);
  });

  if (previewMode) {
    unlockedCount = videoMessages.length;
  }

  updateProgress(unlockedCount);
}

function markAsWatched(day) {
  if (state.watched.has(day)) {
    return;
  }
  state.watched.add(day);
  const ordered = Array.from(state.watched).sort((a, b) => a - b);
  safeStorageSet(WATCHED_KEY, JSON.stringify(ordered));
  renderCalendar();
}

function updateProgress(countOverride) {
  if (!elements.progress) {
    return;
  }
  let count = countOverride;
  if (typeof count === 'undefined') {
    const now = new Date();
    count = videoMessages.filter(message => (previewMode || now >= message.releaseDate) && state.authorized).length;
  }
  elements.progress.textContent = String(count);
}

function setAuthError(message) {
  if (!elements.authError) {
    return;
  }
  elements.authError.textContent = message;
}

function toggleAuthState(isAuthorized) {
  state.authorized = isAuthorized;
  if (document.body && document.body.classList) {
    if (isAuthorized) {
      document.body.classList.add('authorized');
      document.body.classList.remove('requires-auth');
    } else {
      document.body.classList.remove('authorized');
      document.body.classList.add('requires-auth');
    }
  }
  if (elements.authGate) {
    elements.authGate.setAttribute('aria-hidden', isAuthorized ? 'true' : 'false');
    elements.authGate.setAttribute('data-visible', isAuthorized ? 'false' : 'true');
  }
  renderCalendar();
}

function setupLiveRefresh() {
  setInterval(() => {
    if (state.authorized) {
      renderCalendar();
    }
  }, 60 * 1000);
}

function formatDate(date) {
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function safeStorageGet(key) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (error) {
    console.warn('localStorage get blocked:', error);
  }
  return null;
}

function safeStorageSet(key, value) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (error) {
    console.warn('localStorage set blocked:', error);
  }
}

function safeStorageRemove(key) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    console.warn('localStorage remove blocked:', error);
  }
}

function safeParse(rawValue) {
  if (!rawValue) {
    return null;
  }
  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return null;
  }
}

function comparePassphrase(input, expected) {
  const normalizedInput = normalizeText(input);
  const normalizedExpected = normalizeText(expected);
  return normalizedInput.length > 0 && normalizedInput === normalizedExpected;
}

function normalizeText(value) {
  if (typeof value !== 'string') {
    return '';
  }
  const trimmed = value.trim();
  const normalized =
    typeof trimmed.normalize === 'function' ? trimmed.normalize('NFKC') : trimmed;
  return normalized.toLowerCase();
}
