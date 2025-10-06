if (!customElements.get('mega-menu-grid')) {
  class MegaMenuGrid extends HTMLElement {
    connectedCallback() {
      console.log('MegaMenuGrid: connectedCallback fired', this);

      this.drawGridLines();

      // Redraw on resize with debounce
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          console.log('MegaMenuGrid: resize triggered');
          this.drawGridLines();
        }, 100);
      });

      // Redraw when mega menu opens
      const details = this.closest('details');
      console.log('MegaMenuGrid: found details element?', !!details);

      if (details) {
        details.addEventListener('toggle', () => {
          console.log('MegaMenuGrid: details toggled, open?', details.open);
          if (details.open) {
            setTimeout(() => this.drawGridLines(), 50);
          }
        });
      }
    }

    drawGridLines() {
      console.log('MegaMenuGrid: drawGridLines called');

      // Remove existing lines
      const existingLines = this.querySelectorAll('.mega-menu-grid-line');
      console.log('MegaMenuGrid: removing existing lines', existingLines.length);
      existingLines.forEach(el => el.remove());

      const list = this.querySelector('.mega-menu__list');
      console.log('MegaMenuGrid: found list?', !!list, list);

      if (!list) {
        console.warn('MegaMenuGrid: no .mega-menu__list found!');
        return;
      }

      const items = Array.from(list.children);
      console.log('MegaMenuGrid: items count', items.length);

      if (items.length === 0) {
        console.warn('MegaMenuGrid: no items in list!');
        return;
      }

      // Get computed grid columns
      const gridStyle = getComputedStyle(list);
      const columns = gridStyle.gridTemplateColumns.split(' ').length;
      console.log('MegaMenuGrid: columns detected', columns, 'gridTemplateColumns:', gridStyle.gridTemplateColumns);

      // Calculate rows
      const rows = Math.ceil(items.length / columns);
      console.log('MegaMenuGrid: rows calculated', rows);

      // Make list relative positioned for absolute children
      list.style.position = 'relative';

      // Define the spacing offsets (converted to pixels)
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const spacingHorizontal = 0.8182 * rootFontSize; // left/right spacing
      const spacingVertical = 0.6545 * rootFontSize;   // top/bottom spacing
      console.log('MegaMenuGrid: spacing calculated - horizontal:', spacingHorizontal + 'px', 'vertical:', spacingVertical + 'px');

      // Get list dimensions
      const listRect = list.getBoundingClientRect();
      const contentWidth = listRect.width - (spacingHorizontal * 2);
      const contentHeight = listRect.height - (spacingVertical * 2);

      // Draw vertical lines (between columns)
      console.log('MegaMenuGrid: drawing', columns - 1, 'vertical lines');
      for (let i = 1; i < columns; i++) {
        const leftPosition = spacingHorizontal + (i / columns) * contentWidth;
        const line = document.createElement('div');
        line.className = 'mega-menu-grid-line mega-menu-grid-line--vertical';
        line.style.cssText = `
          position: absolute;
          left: ${leftPosition}px;
          top: ${spacingVertical}px;
          height: ${contentHeight}px;
          width: 1px;
          background: #808080;
          pointer-events: none;
          z-index: 1;
        `;
        list.appendChild(line);
        console.log('MegaMenuGrid: vertical line added at', leftPosition + 'px');
      }

      // Draw horizontal lines (between rows)
      console.log('MegaMenuGrid: drawing', rows - 1, 'horizontal lines');
      for (let i = 1; i < rows; i++) {
        const itemIndex = i * columns - 1; // Last item of previous row
        console.log('MegaMenuGrid: checking item at index', itemIndex);

        if (items[itemIndex]) {
          const rect = items[itemIndex].getBoundingClientRect();
          const topPosition = rect.bottom - listRect.top;

          console.log('MegaMenuGrid: horizontal line at', topPosition + 'px');

          const line = document.createElement('div');
          line.className = 'mega-menu-grid-line mega-menu-grid-line--horizontal';
          line.style.cssText = `
            position: absolute;
            top: ${topPosition}px;
            left: ${spacingHorizontal}px;
            width: ${contentWidth}px;
            height: 1px;
            background: #808080;
            pointer-events: none;
            z-index: 1;
          `;
          list.appendChild(line);
        }
      }

      console.log('MegaMenuGrid: drawGridLines complete. Total lines added:', list.querySelectorAll('.mega-menu-grid-line').length);
    }
  }

  customElements.define('mega-menu-grid', MegaMenuGrid);
  console.log('MegaMenuGrid: custom element defined');
} else {
  console.log('MegaMenuGrid: custom element already defined');
}
