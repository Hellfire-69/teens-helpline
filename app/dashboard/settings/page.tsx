"use client";

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { H3, P } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useSettingsStore } from '@/stores/settings-store';
import { Download, Upload, Key, ShieldAlert } from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useSettingsStore();
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <PageContainer>
      <SectionHeader 
        title="Space Settings" 
        description="Manage your preferences and local data."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-8">
        <div className="md:col-span-8 space-y-12">
          
          {/* Preferences */}
          <section className="space-y-6">
            <H3>Preferences</H3>
            <Card className="space-y-6">
              
              {/* Theme */}
              <div className="flex items-center justify-between">
                <div>
                  <P className="font-medium">Theme</P>
                  <P className="text-sm text-text-muted">Choose your preferred appearance.</P>
                </div>
                <select 
                  className="bg-background border border-black/10 rounded-lg px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="system">System</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div className="h-px bg-black/5" />

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <div>
                  <P className="font-medium">Reduced Motion</P>
                  <P className="text-sm text-text-muted">Minimize animations across the platform.</P>
                </div>
                <button 
                  onClick={() => setMotionEnabled(!motionEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${motionEnabled ? 'bg-black/20' : 'bg-primary'}`}
                  aria-checked={!motionEnabled}
                  role="switch"
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-surface transition-transform ${motionEnabled ? 'translate-x-1' : 'translate-x-6'}`} />
                </button>
              </div>

              <div className="h-px bg-black/5" />

              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <P className="font-medium">Daily Reminders</P>
                  <P className="text-sm text-text-muted">Gentle nudges to check in.</P>
                </div>
                <button 
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${notifications ? 'bg-primary' : 'bg-black/20'}`}
                  aria-checked={notifications}
                  role="switch"
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-surface transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </Card>
          </section>

          {/* Data Management */}
          <section className="space-y-6">
            <H3>Data Management</H3>
            <Card className="space-y-6 opacity-60 pointer-events-none">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-black/5 rounded-lg"><Download className="h-5 w-5 text-text-muted" /></div>
                  <div>
                    <P className="font-medium">Export Data</P>
                    <P className="text-sm text-text-muted">Download your entries as JSON.</P>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-black/5 rounded text-text-muted">COMING SOON</span>
              </div>

              <div className="h-px bg-black/5" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-black/5 rounded-lg"><Upload className="h-5 w-5 text-text-muted" /></div>
                  <div>
                    <P className="font-medium">Import Data</P>
                    <P className="text-sm text-text-muted">Restore a previous backup.</P>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-black/5 rounded text-text-muted">COMING SOON</span>
              </div>

              <div className="h-px bg-black/5" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-black/5 rounded-lg"><Key className="h-5 w-5 text-text-muted" /></div>
                  <div>
                    <P className="font-medium">Recovery Keys</P>
                    <P className="text-sm text-text-muted">Secure your anonymous space.</P>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-black/5 rounded text-text-muted">COMING SOON</span>
              </div>

            </Card>
          </section>

          {/* Danger Zone */}
          <section className="space-y-6">
            <H3 className="text-red-600">Danger Zone</H3>
            <Card className="border-red-100 bg-red-50/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <P className="font-medium text-red-900">Delete Space</P>
                  <P className="text-sm text-red-700/80">Permanently delete all your moods, journals, and Nova conversations.</P>
                </div>
                
                {!showDeleteConfirm ? (
                  <Button 
                    variant="outline" 
                    className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 bg-surface sm:w-auto w-full whitespace-nowrap"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete Space
                  </Button>
                ) : (
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button 
                      variant="ghost" 
                      className="text-text-muted flex-1 sm:flex-none"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white flex-1 sm:flex-none"
                      onClick={() => alert("Space deletion would happen here.")}
                    >
                      Confirm
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </section>

        </div>

        {/* Sidebar */}
        <div className="md:col-span-4">
          <Card className="bg-primary/5 border-none">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <ShieldAlert className="h-5 w-5" />
              <H3 className="text-lg">Privacy First</H3>
            </div>
            <P className="text-sm text-text-muted mb-4">
              Your space is completely anonymous. We don&apos;t ask for your name, email, or phone number.
            </P>
            <P className="text-sm text-text-muted">
              Everything you write is tied only to this device unless you choose to set up recovery keys in the future.
            </P>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
