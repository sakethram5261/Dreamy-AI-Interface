import { useState } from "react";
import { Key, X, Eye, EyeOff, ExternalLink, CheckCircle2, Trash2 } from "lucide-react";
import { useHFKey } from "@/hooks/use-hf-key";

interface HFKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HFKeyModal({ isOpen, onClose }: HFKeyModalProps) {
  const { hfKey, setHFKey, clearHFKey, hasKey } = useHFKey();
  const [inputValue, setInputValue] = useState(hfKey);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setHFKey(inputValue);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    clearHFKey();
    setInputValue("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-testid="hf-key-modal-backdrop"
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <div className="relative w-full max-w-md glass-panel rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(0,240,255,0.08)] overflow-hidden">
        {/* Top glow line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-white">HuggingFace API Key</h2>
                <p className="text-xs text-white/40 font-mono">Stored locally in your browser</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
              data-testid="close-hf-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status badge */}
          {hasKey && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>API key is active</span>
            </div>
          )}

          {/* Info */}
          <p className="text-sm text-white/50 mb-5 leading-relaxed">
            Enter your HuggingFace Access Token below to enable AI model interactions.
            Your key is saved only in your browser — it never leaves your device.
          </p>

          {/* Key input */}
          <div className="relative group mb-2">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center bg-background/80 border border-white/10 rounded-2xl px-4 py-3 gap-3 group-focus-within:border-primary/50 transition-colors duration-300">
              <Key className="w-4 h-4 text-white/30 shrink-0" />
              <input
                type={showKey ? "text" : "password"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/20 text-sm font-mono"
                data-testid="hf-key-input"
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="text-white/30 hover:text-white/70 transition-colors"
                data-testid="toggle-key-visibility"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <p className="text-xs text-white/30 mb-6 ml-1">
            Starts with <span className="font-mono text-white/50">hf_</span>
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            {hasKey && (
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-white/50 hover:text-red-400 text-sm transition-all duration-200"
                data-testid="clear-hf-key"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            )}

            <button
              onClick={handleSave}
              disabled={!inputValue.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-background font-semibold text-sm hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              data-testid="save-hf-key"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                "Save Key"
              )}
            </button>
          </div>

          {/* Get key link */}
          <div className="mt-6 pt-5 border-t border-white/5">
            <a
              href="https://huggingface.co/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-white/30 hover:text-primary transition-colors duration-200 group"
              data-testid="hf-get-token-link"
            >
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              Don't have a key? Get one free at huggingface.co/settings/tokens
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
