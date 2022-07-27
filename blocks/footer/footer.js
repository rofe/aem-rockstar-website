/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { readBlockConfig, decorateIcons } from '../../scripts/scripts.js';

function decorateBackToTop(element) {

  /*
  <div class="button button--icon-position:after transparent">
<button type="button" id="back-to-top" class="cmp-button" aria-label="Back to Top" data-cmp-clickable="" data-cmp-data-layer="{&quot;back-to-top&quot;:{&quot;@type&quot;:&quot;core/wcm/components/button/v1/button&quot;,&quot;dc:title&quot;:&quot;Back to Top&quot;}}">
    
    <span class="cmp-button__icon cmp-button__icon--arrow-up" aria-hidden="true"></span>

    <span class="cmp-button__text">Back to Top</span>
</button>
</div>
  */
  const backToTopDiv = document.createElement('div');
  backToTopDiv.classList.add('button', 'button--icon-position:after', 'transparent');

  const backToTopButton = document.createElement('button');
  backToTopButton.id = 'back-to-top';
  backToTopButton.classList.add('cmp-button');

  const text = document.createElement('span');
  text.innerText = 'Back To Top';
  text.classList.add('cmp-button__text');
  backToTopButton.appendChild(text);
  
  const arrow = document.createElement('span');
  arrow.classList.add('cmp-button__icon','cmp-button__icon--arrow-up');
  backToTopButton.appendChild(arrow);

  backToTopButton.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });

  backToTopDiv.append(backToTopButton);
  element.appendChild(backToTopDiv);
}

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();
  const footer = document.createElement('div');
  footer.innerHTML = html;
  footer.classList.add('max-w-screen-xl', 'w-full', 'items-center', 'flex', 'justify-between', 'mx-auto', 'py-4');
  
  await decorateIcons(footer);

  decorateBackToTop(footer);

  block.append(footer);
  block.classList.add('black', 'cmp-container');

}
