'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserProfile, createUserProfile, updateUserProfile } from '@/lib/actions';
import type { UserProfile } from '@/types';

export default function UserProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    last_name: '',
    first_name: '',
    last_name_kana: '',
    first_name_kana: '',
    birth_date: '',
    gender: undefined,
    phone_number: '',
    postal_code: '',
    prefecture: '',
    city: '',
    address_line: '',
    building: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    desired_job_type: '',
    skills: '',
    certifications: '',
    years_of_experience: undefined,
    desired_work_location: '',
    desired_employment_type: undefined,
    desired_hourly_rate: undefined,
    profile_image_url: '',
    self_introduction: '',
    available_days: '',
    transportation: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile();
      setProfile(data);
      setIsEditMode(true);
    } catch (err) {
      // プロフィールがない場合は新規作成モード
      setIsEditMode(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const profileData = {
        user_profile: {
          last_name: profile.last_name || '',
          first_name: profile.first_name || '',
          last_name_kana: profile.last_name_kana || '',
          first_name_kana: profile.first_name_kana || '',
          birth_date: profile.birth_date,
          gender: profile.gender,
          phone_number: profile.phone_number,
          postal_code: profile.postal_code,
          prefecture: profile.prefecture,
          city: profile.city,
          address_line: profile.address_line,
          building: profile.building,
          emergency_contact_name: profile.emergency_contact_name,
          emergency_contact_phone: profile.emergency_contact_phone,
          desired_job_type: profile.desired_job_type,
          skills: profile.skills,
          certifications: profile.certifications,
          years_of_experience: profile.years_of_experience,
          desired_work_location: profile.desired_work_location,
          desired_employment_type: profile.desired_employment_type,
          desired_hourly_rate: profile.desired_hourly_rate,
          profile_image_url: profile.profile_image_url,
          self_introduction: profile.self_introduction,
          available_days: profile.available_days,
          transportation: profile.transportation,
        },
      };

      if (isEditMode) {
        await updateUserProfile(profileData);
        alert('プロフィールを更新しました');
      } else {
        await createUserProfile(profileData);
        alert('プロフィールを登録しました');
        setIsEditMode(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">
            {isEditMode ? 'プロフィール編集' : 'プロフィール登録'}
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 基本情報 */}
            <section>
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">基本情報</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    姓 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={profile.last_name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={profile.first_name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    セイ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="last_name_kana"
                    value={profile.last_name_kana}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    メイ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name_kana"
                    value={profile.first_name_kana}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">生年月日</label>
                  <input
                    type="date"
                    name="birth_date"
                    value={profile.birth_date || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">性別</label>
                  <select
                    name="gender"
                    value={profile.gender || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">選択してください</option>
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                    <option value="other">その他</option>
                    <option value="prefer_not_to_say">回答しない</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">電話番号</label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={profile.phone_number || ''}
                    onChange={handleChange}
                    placeholder="09012345678"
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* 住所情報 */}
            <section>
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">住所情報</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">郵便番号</label>
                  <input
                    type="text"
                    name="postal_code"
                    value={profile.postal_code || ''}
                    onChange={handleChange}
                    placeholder="1234567"
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">都道府県</label>
                  <input
                    type="text"
                    name="prefecture"
                    value={profile.prefecture || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">市区町村</label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">番地</label>
                  <input
                    type="text"
                    name="address_line"
                    value={profile.address_line || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">建物名・部屋番号</label>
                  <input
                    type="text"
                    name="building"
                    value={profile.building || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* 緊急連絡先 */}
            <section>
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">緊急連絡先</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">氏名</label>
                  <input
                    type="text"
                    name="emergency_contact_name"
                    value={profile.emergency_contact_name || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">電話番号</label>
                  <input
                    type="tel"
                    name="emergency_contact_phone"
                    value={profile.emergency_contact_phone || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* 職務情報 */}
            <section>
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">職務情報</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">希望職種</label>
                  <input
                    type="text"
                    name="desired_job_type"
                    value={profile.desired_job_type || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">経験年数</label>
                  <input
                    type="number"
                    name="years_of_experience"
                    value={profile.years_of_experience || ''}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">希望勤務地</label>
                  <input
                    type="text"
                    name="desired_work_location"
                    value={profile.desired_work_location || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">希望雇用形態</label>
                  <select
                    name="desired_employment_type"
                    value={profile.desired_employment_type || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">選択してください</option>
                    <option value="full_time">正社員</option>
                    <option value="part_time">パート・アルバイト</option>
                    <option value="contract">契約社員</option>
                    <option value="temporary">派遣社員</option>
                    <option value="freelance">フリーランス</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">希望時給（円）</label>
                  <input
                    type="number"
                    name="desired_hourly_rate"
                    value={profile.desired_hourly_rate || ''}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">交通手段</label>
                  <input
                    type="text"
                    name="transportation"
                    value={profile.transportation || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">スキル</label>
                  <textarea
                    name="skills"
                    value={profile.skills || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">資格</label>
                  <textarea
                    name="certifications"
                    value={profile.certifications || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">稼働可能日時</label>
                  <textarea
                    name="available_days"
                    value={profile.available_days || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* 自己紹介 */}
            <section>
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">自己紹介</h2>
              <div>
                <label className="block text-sm font-medium mb-1">自己PR</label>
                <textarea
                  name="self_introduction"
                  value={profile.self_introduction || ''}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </section>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
              >
                {saving ? '保存中...' : isEditMode ? '更新する' : '登録する'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
