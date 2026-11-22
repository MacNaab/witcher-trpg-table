import { useEffect, useRef } from 'react';
import type { CreatureTypeId } from '@/src/data/bestiary/types';
import type { ModuleLanguage } from '../types';
import {
  getSuggestionSecondaryLabel,
  type CaretPopupCoords,
  type CreatureTypeSuggestion,
} from '../utils/textareaAutocomplete';

interface CreatureTypeAutocompleteMenuProps {
  lang: ModuleLanguage;
  suggestions: CreatureTypeSuggestion[];
  activeIndex: number;
  coords: CaretPopupCoords;
  onSelect: (typeId: CreatureTypeId) => void;
  onHoverIndex: (index: number) => void;
}

/**
 * Floating inline autocomplete popover anchored to the Markdown textarea caret
 * when typing or editing `type:` inside a monster sheet.
 */
export function CreatureTypeAutocompleteMenu({
  lang,
  suggestions,
  activeIndex,
  coords,
  onSelect,
  onHoverIndex,
}: CreatureTypeAutocompleteMenuProps) {
  const activeRowRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    activeRowRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  if (suggestions.length === 0) return null;

  return (
    <div
      role="listbox"
      aria-label={
        lang === 'fr'
          ? 'Suggestions de catégorie de monstre'
          : 'Monster category suggestions'
      }
      style={{
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        transform: coords.openUpward ? 'translateY(-100%)' : undefined,
      }}
      className="absolute z-30 w-[280px] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg ring-1 ring-black/10"
    >
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground">
        <span>
          {lang === 'fr' ? 'Catégorie (type:)' : 'Monster Category (type:)'}
        </span>
        <span className="font-mono text-[10px]">
          {lang === 'fr' ? '↑↓ · Entrée / Tab' : '↑↓ · Enter / Tab'}
        </span>
      </div>

      <div className="max-h-56 overflow-y-auto p-1">
        {suggestions.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              ref={isActive ? activeRowRef : undefined}
              type="button"
              role="option"
              aria-selected={isActive}
              onMouseDown={(e) => {
                // Prevent textarea blur so caret & insertion stay seamless
                e.preventDefault();
                onSelect(item.id);
              }}
              onMouseEnter={() => onHoverIndex(idx)}
              className={`flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-muted/60'
              }`}
            >
              <img
                src={item.emblemUrl}
                alt={item.id}
                className="size-6 shrink-0 object-contain"
              />
              <span className="font-mono font-semibold text-foreground">
                {item.id}
              </span>
              <span className="ml-auto truncate text-[11px] text-muted-foreground">
                {getSuggestionSecondaryLabel(item, lang)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
